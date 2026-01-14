param(
    [int]$Port = 8000
)

$cwd = (Get-Location).Path
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, [int]$Port)
$listener.Start()
Write-Output "Serving $cwd on http://localhost:$Port/ (listening on all interfaces)"

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
    } catch {
        break
    }

    try {
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII)
        $requestLine = $reader.ReadLine()
        if (-not $requestLine) { $stream.Close(); $client.Close(); continue }

        while (($line = $reader.ReadLine()) -ne '') { if ($null -eq $line) { break } }

        if ($requestLine -match '^(GET|HEAD) (\S+) HTTP') {
            $method = $matches[1]
            $rawPath = $matches[2]
        } else {
            $response = "HTTP/1.1 400 Bad Request`r`nContent-Length:0`r`nConnection:close`r`n`r`n"
            $bytesResp = [System.Text.Encoding]::ASCII.GetBytes($response)
            $stream.Write($bytesResp,0,$bytesResp.Length)
            $stream.Close(); $client.Close(); continue
        }

        $path = $rawPath.TrimStart('/')
        if ($path -eq '') { $path = 'index.html' }
        $file = Join-Path $cwd $path

        if (-not (Test-Path $file)) {
            $body = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $headers = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
            $hbytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
            $stream.Write($hbytes,0,$hbytes.Length)
            $stream.Write($body,0,$body.Length)
            $stream.Close(); $client.Close(); continue
        }

        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        switch ($ext) {
            '.html' { $ctype='text/html; charset=utf-8' }
            '.htm'  { $ctype='text/html; charset=utf-8' }
            '.css'  { $ctype='text/css' }
            '.js'   { $ctype='application/javascript' }
            '.png'  { $ctype='image/png' }
            '.jpg'  { $ctype='image/jpeg' }
            '.jpeg' { $ctype='image/jpeg' }
            '.gif'  { $ctype='image/gif' }
            '.svg'  { $ctype='image/svg+xml' }
            default { $ctype='application/octet-stream' }
        }

        $headers = "HTTP/1.1 200 OK`r`nContent-Type: $ctype`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n"
        $hbytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
        $stream.Write($hbytes,0,$hbytes.Length)
        $stream.Write($bytes,0,$bytes.Length)
        $stream.Close(); $client.Close()

    } catch {
        try { $client.Close() } catch {}
    }
}

$listener.Stop()
