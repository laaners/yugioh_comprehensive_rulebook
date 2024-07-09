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