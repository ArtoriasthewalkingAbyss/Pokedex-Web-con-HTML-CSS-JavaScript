(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const p="https://pokeapi.co/api/v2/pokemon/",i={};async function m(o){if(!i[o]){const e=await(await fetch(p+o)).json();i[o]=e}return i[o]}async function f(){const o=[];for(let e=1;e<=151;e++)o.push(m(e));(await Promise.all(o)).forEach(e=>a(e))}const l=document.querySelector("#listaPokemon"),d=document.querySelectorAll(".btn-header");function a(o){let r=o.types.map(t=>`<li class="${t.type.name} tipo">${t.type.name}</li>`);r=r.join("");let e=o.id.toString();e.length===1?e="00"+e:e.length===2&&(e="0"+e);const n=document.createElement("li");n.classList.add("pokemon"),n.innerHTML=`
        <p class="pokemon-id-back">#${e}</p>
        <div class="pokemon-imagen">
            <img src="${o.sprites.other["official-artwork"].front_default}" alt="${o.name}">
        </div>
        <section class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${e}</p>
                <h2 class="pokemon-nombre">${o.name}</h2>
            </div>
            <ul class="pokemon-tipos">
                ${r}
            </ul>
            <ul class="pokemon-stats">
                <li class="stat">${o.height}m</li>
                <li class="stat">${o.weight}kg</li>
            </ul>
        </section>
    `,l.append(n)}f();d.forEach(o=>o.addEventListener("click",r=>{const e=r.currentTarget.id;l.innerHTML="";for(let n=1;n<=151;n++)(e==="ver-todos"||i[n].types.map(s=>s.type.name).some(s=>s.includes(e)))&&a(i[n])}));
