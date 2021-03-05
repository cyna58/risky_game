$x = 1

$dimx = 1025 / 25
$dimy = 825 / 25

$dim = $dimx * $dimy
$lol = ""

while ($x -le $dim) {
$lol += (echo "<button id='field${x}' class='tile' onclick='this.className = wah'>x</button>")
$x++
}

cd C:\Users\mzaczek\Desktop\riskygame

$lol | Out-File .\mapa.txt

