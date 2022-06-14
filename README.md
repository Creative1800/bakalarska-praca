# bakalarska-praca

Aplikácia bola vytvorená vrámci bakalárskej práce.
Cieľom bolo vytvoriť kolaboratívnu aplikáciu pre hendikepovaných študentov v Prešovskej škole.
Aplikácia obsahuje úlohy ikonicko-textovej metódy dvoch typov.
V prvom type majú študenti za úlohu priradiť obrázkom správne slovo, ktoré obrázok vyjadruje.
Druhý typ úlohy je opačného charakteru, študenti majú k dispozícii slová, ktorým majú priradiť 
obrázky.

Hlavným cieľom aplikácie bolo umožniť používateľom spolupracovať pri vypracovaní úloh.
Spolupráca bola vytvorená pomocou tzv. viruálnych miestností, do ktorých keď študent
vstúpi, ostatným študentom pribudne jeho meno v zozname aktívnych úloh. Študenti
spolupracujú v reálnom čase na jednej otázke. Ak si chcú overiť správnosť riešenia otázky,
môžu tak urobiť kliknutím na tlačidlo. Ak je otázka vyhodnotená kladne, študentom je 
zobrazená ďalšia otázka, ak nie, študenti majú možnosť opraviť svoje riešenie.
Takto pokračujú pokiaľ nezodpovedajú správne na všetky otázky.

Aplikácia bola vytvorená na frontende v Reacte, HTML, CSS a čiastočne v Bootstrape.
Na backende bol použitý Node.js s Expressom. Databáza bola vytvorená pomocou PostgreSql.
Prepojenie medzi klientom a serverom bolo vytvorené Axiosom. Kolaborácia medzi študentmi
bola zabezpečená WebSocketmi.
