<!-- TOC -->

- [ATK/DEF modifiers](#atkdef-modifiers)
- [Summons](#summons)
    - [Summon restrictions and successful summons](#summon-restrictions-and-successful-summons)
- [Trigger effects](#trigger-effects)
    - [Leaves the field](#leaves-the-field)
    - [Location changes mid-chain](#location-changes-mid-chain)

<!-- /TOC -->

## ATK/DEF modifiers
[Source](https://ygorganization.com/atkdefmodifierguide/)

Any given modifier can fall under one of the following different categories:
1. Activated effect modifier that increases/decreases the current ATK/DEF.

2. Non-activated effect modifier that increases/decreases the current ATK/DEF.

3. Activated effect modifier that sets current ATK/DEF to determined value.

4. Non-activated effect modifier that sets current ATK/DEF to determined value.

5. Activated effect modifier that sets original ATK/DEF to determined value.

6. Non-activated effect modifier that sets original ATK/DEF to determined value.



<style>
    td, th {
        text-align: center;
        position: relative;
        border: 1px solid #000;
    }

    td {
        width: 200px;
        word-wrap: break-word;
    }
</style>

<table align="center">
    <tr>
        <th width=200 colspan=3 rowspan="3" style="background: linear-gradient(to bottom left, transparent 49.5%, #000 50%, transparent 50.5%);">
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
        <td rowspan=6>(1,2) are always applied successfully</td>
        <td>Remove previous (1,3) when applying (3)</td>
        <td>(1,3,5) are not reapplied until (4) stops applying</td>
        <td colspan=2>Apply (5,6) and reapply (1,2) afterwards</td>
    </tr>
</table>


## Summons

### Summon restrictions and successful summons
[Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

The restriction of "you cannot Normal or Special Summon the turn you activate this card" only refers to monsters that were successfully summoned. Same for "you can only Special Summon X once per turn" restrictions.

- [Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

## Trigger effects

### Leaves the field
[Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

When a monster on the field is shuffled into the Deck, or becomes an Xyz Material, it is no longer a card on the field, however its effects that activate when it "leaves the field" will not activate. Deck includes both Main and Extra Deck.

### Location changes mid-chain
[Source](https://www.yugioh-card.com/en/play/2021_rules_update/)

If a monster’s Trigger Effect meets its activation conditions, BUT hasn’t yet had a chance to actually activate yet (because it’s still in the middle of a chain or card effect, for example) and is therefore being "saved for later", BUT its location* changes between the time its Trigger Effect activation is met, and the time it actually has a chance to activate, its effect does not activate. [*On the field, in the Graveyard, in the hand, banished, or in the Deck.]

- [Example](https://db.ygoresources.com/qa#23251)