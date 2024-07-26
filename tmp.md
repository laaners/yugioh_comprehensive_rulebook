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
<p align="left">
	<ol>
		<li>
			<a target="_blank" href="https://www.yugioh-card.com/en/rulebook/">Official rulebook page 25</a>,
		</li>
		<li id="properly_special_summon-2">
			<a target="_blank" href="https://db.ygoresources.com/qa#10331">YGOrg Database of Official OCG Rulings</a>
		</li>
		<li>
            <a target="_blank" href="https://ygorganization.com/perfect-rulebook-2017/">OCG Perfect Rulebook 2017</a>
        </li>
	</ol>
</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
    hrefs = hrefs.map(_=>`<a target="_blank" href="${_.href}">${_.innerText.replace("the original", "original")}</a>`)
    res += `
        <li id="sub-steps_of_the_damage_step-${i-9}">
            ${hrefs.reduce((a,b) => a+", archived from the "+b)}
            ${text}
        </li>`
}
console.log(res)
```
