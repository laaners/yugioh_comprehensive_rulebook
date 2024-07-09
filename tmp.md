<svg id="mysvg" width="600" height="250" xmlns="http://www.w3.org/2000/svg">
        <!-- Image 1 -->
        <image id="img1" x="350" y="25" width="200" height="200" href="https://images.ygoprodeck.com/images/cards/77235086.jpg" />
        <!-- Image 2 -->
        <image id="img2" x="50" y="25" width="200" height="200" href="https://images.ygoprodeck.com/images/cards/97148796.jpg" />
        <!-- Arrow -->
        <line x1="250" y1="125" x2="350" y2="125" stroke="black" stroke-width="2" marker-end="url(#arrowhead)" />
        <!-- Arrowhead Definition -->
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
        </defs>
        <!-- Text -->
        <text x="300" y="110" font-family="Arial" font-size="18" fill="black" text-anchor="middle">Tributes</text>
    </svg>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<style>
    td, th {
        /* text-align: center; */
        position: relative;
        border: 1px solid #000;
    }

    td {
        width: 120px !important;
        word-wrap: break-word;   
    }

</style>

<table align="center">
    <tr>
        <th width=250 colspan=3 rowspan="3" style="background: linear-gradient(to bottom left, transparent 49.5%, #000 50%, transparent 50.5%);">
            <div style="position: absolute; top: 0; right: 0; padding: 5%; z-index: 1;">New</div>
            <div style="position: absolute; bottom: 0; left: 0; padding: 5%; z-index: 1;">Previously applying</div>
        </th>
        <th>+/-</th>
        <th colspan=2>Set current</th>
        <th colspan=2>Set original</th>
    </tr>
    <tr>
        <th>(1)+(2)</th>
        <th>(3)</th>
        <th>(4)</th>
        <th>(5)</th>
        <th>(6)</th>
    </tr>
    <tr>
        <th>Lingering+Continuous</th>
        <th>Lingering</th>
        <th>Continuous</th>
        <th>Lingering</th>
        <th>Continuous</th>
    </tr>
    <!-- cases -->
    <tr>
        <th rowspan=2>+/-</th>
        <th>(1)</th>
        <th>Lingering</th>
        <td rowspan=6>🟥 (1,2) are always applied successfully</td>
        <td>🟧 Remove previous (1,3) when applying (3)</td>
        <td>🟩 (1,3,5) are not reapplied until (4) stops applying</td>
        <td colspan=2 rowspan=2>🟦 Apply (5,6) and reapply (1,2) afterwards</td>
    </tr>
    <tr>
        <th>(2)</th>
        <th>Continuous</th>
        <td>🟩 (2,4) are not reapplied until (3) stops applying</td>
        <td>🟦 Apply (4) and reapply (2) afterwards</td>
    </tr>
    <tr>
        <th rowspan=2>Set current</th>
        <th>(3)</th>
        <th>Lingering</th>
        <td>🟧 Remove previous (1,3) when applying (3)</td>
        <td>🟩 (1,3,5) are not reapplied until (4) stops applying</td>
        <td>🟧 Remove previous (3,5) when applying (5)</td>
        <td>🟩 (3,5) are not reapplied until (6) stops applying</td>
    </tr>
    <tr>
        <th>(4)</th>
        <th>Continuous</th>
        <td>🟩 (2,4) are not reapplied until (3) stops applying</td>
        <td>🟨 Apply new (4)</td>
        <td colspan=2>🟦 Apply (5,6) and reapply (4) afterwards</td>
    </tr>
    <tr>
        <th rowspan=2>Set original</th>
        <th>(5)</th>
        <th>Lingering</th>
        <td rowspan=2>🟥 Apply (3) after previous (5,6)</td>
        <td>🟩 (1,3,5) are not reapplied until (4) stops applying</td>
        <td>🟧 Remove previous (3,5) when applying (5)</td>
        <td>(3,5) are not reapplied until (6) stops applying</td>
    </tr>
    <tr>
        <th>(6)</th>
        <th>Continuous</th>
        <td>🟦 Apply (6) and reapply (4) afterwards</td>
        <td>🟩 (6) are not reapplied until (5) stops applying</td>
        <td>🟨 Apply new (6)</td>
    </tr>
</table>