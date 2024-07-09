<a id="readme-top"></a>

<!-- TOC -->

- [ATK/DEF modifiers](#atkdef-modifiers)
  - [Categories and interactions](#categories-and-interactions)
  - [Special cases](#special-cases)
- [Summons](#summons)
  - [Summon restrictions and successful summons](#summon-restrictions-and-successful-summons)
- [Trigger effects](#trigger-effects)
  - [Leaves the field](#leaves-the-field)
  - [Location changes mid-chain](#location-changes-mid-chain)

<!-- /TOC -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ATK/DEF modifiers
[Source](https://ygorganization.com/atkdefmodifierguide/),
[Pazim's Resources](https://www.dropbox.com/scl/fo/tia8xzqafu1ibscz0gz95/AEx_Ri-wkJ9QE75AWRKn4RQ?preview=Judge+Resources.pdf&rlkey=z6uissqwewd81wm9c03zosaa3)

### Categories and interactions
Any given modifier can fall under one of the following different categories:
1. Activated/Lingering  effect modifier that increases/decreases the current ATK/DEF.

2. Non-activated/Continuous effect modifier that increases/decreases the current ATK/DEF.

3. Activated/Lingering effect modifier that sets current ATK/DEF to determined value.

4. Non-activated/Continuous effect modifier that sets current ATK/DEF to determined value.

5. Activated/Lingering effect modifier that sets original ATK/DEF to determined value.

6. Non-activated/Continuous effect modifier that sets original ATK/DEF to determined value.

Possible outcomes:

$\hspace{1em}$🟥 (x) are always applied successfully/Apply (x) after previous (5,6)

$\hspace{1em}$🟧 Remove previous (y) when applying (x): apply (x) then when (x) stops applying the value will forget/won't apply anymore about (y)

$\hspace{1em}$🟩 (y) are not reapplied until (x) stops applying

$\hspace{1em}$🟦 Apply (x) and reapply (y) afterwards

$\hspace{1em}$🟨 Apply new (x): overwrites previous (y) of the same kind

<table align="center">
    <tr>
        <th width=200 colspan=3 rowspan="3">
            <div align="right">New</div>
            <div align="center">\</div>
            <div align="left">Prev</div>
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
        <th>L+C</th>
        <th>L</th>
        <th>C</th>
        <th>L</th>
        <th>C</th>
    </tr>
    <!-- cases -->
    <tr>
        <th rowspan=2>+/-</th>
        <th>(1)</th>
        <th>L</th>
        <td rowspan=6>🟥 (1,2) are always applied successfully</td>
        <td>🟧 Remove previous (1,3) when applying (3)</td>
        <td>🟩 (1,3,5) are not reapplied until (4) stops applying</td>
        <td colspan=2 rowspan=2>🟦 Apply (5,6) and reapply (1,2) afterwards</td>
    </tr>
    <tr>
        <th>(2)</th>
        <th>C</th>
        <td>🟩 (2,4) are not reapplied until (3) stops applying</td>
        <td>🟦 Apply (4) and reapply (2) afterwards</td>
    </tr>
    <tr>
        <th rowspan=2>Set current</th>
        <th>(3)</th>
        <th>L</th>
        <td>🟧 Remove previous (1,3) when applying (3)</td>
        <td>🟩 (1,3,5) are not reapplied until (4) stops applying</td>
        <td>🟧 Remove previous (3,5) when applying (5)</td>
        <td>🟩 (3,5) are not reapplied until (6) stops applying</td>
    </tr>
    <tr>
        <th>(4)</th>
        <th>C</th>
        <td>🟩 (2,4) are not reapplied until (3) stops applying</td>
        <td>🟨 Apply new (4)</td>
        <td colspan=2>🟦 Apply (5,6) and reapply (4) afterwards</td>
    </tr>
    <tr>
        <th rowspan=2>Set original</th>
        <th>(5)</th>
        <th>L</th>
        <td rowspan=2>🟥 Apply (3) after previous (5,6)</td>
        <td>🟩 (1,3,5) are not reapplied until (4) stops applying</td>
        <td>🟧 Remove previous (3,5) when applying (5)</td>
        <td>🟩 (3,5) are not reapplied until (6) stops applying</td>
    </tr>
    <tr>
        <th>(6)</th>
        <th>C</th>
        <td>🟦 Apply (6) and reapply (4) afterwards</td>
        <td>🟩 (6) are not reapplied until (5) stops applying</td>
        <td>🟨 Apply new (6)</td>
    </tr>
</table>

Some examples:
    

### Special cases
For these special cases, no matter what the effects currently in play are, they are always applied last. If a new effect is applied, reapply
those effects right afterwards.\
When those effects stop applying, reapply everything, including lingering effects (1,3,5)





<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Summons

### Summon restrictions and successful summons
[Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

The restriction of "you cannot Normal or Special Summon the turn you activate this card" only refers to monsters that were successfully summoned. Same for "you can only Special Summon X once per turn" restrictions.

- [Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Trigger effects

### Leaves the field
[Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

When a monster on the field is shuffled into the Deck, or becomes an Xyz Material, it is no longer a card on the field, however its effects that activate when it "leaves the field" will not activate. Deck includes both Main and Extra Deck.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Location changes mid-chain
[Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

If a monster’s Trigger Effect meets its activation conditions, BUT hasn’t yet had a chance to actually activate yet (because it’s still in the middle of a chain or card effect, for example) and is therefore being "saved for later", BUT its location* changes between the time its Trigger Effect activation is met, and the time it actually has a chance to activate, its effect does not activate. [*On the field, in the Graveyard, in the hand, banished, or in the Deck.]

- [Example](https://db.ygoresources.com/qa#23251)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

