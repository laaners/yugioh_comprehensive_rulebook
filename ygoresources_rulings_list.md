# More resources

https://www.reddit.com/r/yugioh/wiki/card_interactions/

# Images

<div align="center">
	<img src="./images/game_mat.png" width=800 />
</div>

# Details and summary

<details align="left">
    <summary>(1,2) are always applied successfully</summary>
    <img src="./images/image-1.png">(1900+700)-600 → 2000
</details>


<details align="left">
    <summary align="center">✔️</summary>                
    <ul>
        <li>
            <a target="_blank" href="https://db.ygoresources.com/qa#69">"Revendread Slayer", "Book of Moon"</a>
        </li>
    </ul>
</details>

# Examples list

Examples:
- ["Nekroz Cycle", "Nekroz of Clausolas"](https://db.ygoresources.com/qa#7022)

# References/Citation

<sup><a href="#psct_text_structure-3">[3]</a></sup>

**References**:
<ol>
    <li>
        <a target="_blank" href="https://www.yugioh-card.com/en/rulebook/">Official rulebook page 25</a>
    </li>
    <li id="properly_special_summon-2">
        YGOrg Database of Official OCG Rulings: <a target="_blank" href="https://db.ygoresources.com/qa#10331">"Meklord Emperor Granel"</a>
    </li>
    <li>
        <a target="_blank" href="https://ygorganization.com/perfect-rulebook-2017/">OCG Perfect Rulebook 2017 page 28</a>
    </li>
    <li id="sub-steps_of_the_damage_step-3">
        <a target="_blank" href="https://ygorganization.com/perfect-rulebook-2017/">OCG Perfect Rulebook 2017 pages 188–193</a>
    </li>
    <li>
        <a target="_blank" href="https://web.archive.org/web/20190414183558/https://yugiohblog.konami.com/articles/?p=8318">Official KONAMI's article</a>, archived from the <a target="_blank" href="https://yugiohblog.konami.com/articles/?p=8318">original</a>
    </li>
    <li>		
        <a target="_blank" href="https://imgur.com/targeting-rules-insert-JH4NxL1">Insert from Rise of the True Dragons Structure Deck</a>
    </li>
</ol>
<p align="right">(<a href="#readme-top">back to table of contents</a>)</p>

<sup><a href="#deckout_add_send_from_deck">[3]</a></sup>
**References**:
<ol>
    <li>
        <a target="_blank" href="https://www.yugioh-card.com/en/rulebook/">Official rulebook pages 3-5</a>
    </li>
    <li>
        <a target="_blank" href="https://ygorganization.com/perfect-rulebook-2017/">OCG Perfect Rulebook 2017 page 46</a>
    </li>
</ol>
<p align="right">(<a href="#readme-top">back to table of contents</a>)</p>


OCG Perfect Rulebook 2017 structure:
- Basics [...] almost equivalent to TCG rulebook
- High Level Rules, pages 28-
  - Card/effect activation
  - if vs when equivalent
  - Cost
  - Target
  - Chains
    - spell speeds
    - priority
- Pick up rules
  - ash blossom
  - future fusion
  - necrovalley
- Outlines of the OCG: Page 40
- The field for Dueling: Page 44
  - field
  - hand
  - banished
- Cards: Page 54
  - properties: attributes...
- Card Effects: 126
- Text that is not an effect: Page 175
- Progress of the game: Page 180
- Tournament Rules: Page 197

# Yugipedia references extractor

```javascript
references = Array.from(document.body.querySelectorAll(".references li"))
res = ""
for(let i = 3; i < references.length; i++) {
    const reference = references[i]
    let text = reference.querySelector(".reference-text")
    if(text == undefined)
        continue
    text = text.innerText

    let hrefs = Array.from(reference.querySelectorAll(".reference-text cite a"))
    hrefs = hrefs.map(_=>`<a href="${_.href}">${_.innerText.replace("the original", "original")}</a>`)
    res += `
        <li id="sub-steps_of_the_damage_step-${i-9}">
            ${hrefs.reduce((a,b) => a+", archived from the "+b)}
            ${text}
        </li>`
}
console.log(res)
```
