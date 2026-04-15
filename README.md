# 🛡️ Projekt "Bakaláři" – Simulace Phishingu

Tento projekt vznikl jako praktická součást **diplomové práce**, která se zabývá kybernetickou bezpečností a metodami sociálního inženýrství. Cílem aplikace je simulovat reálný phishingový útok v kontrolovaném prostředí a sbírat anonymní statistická data o chování uživatelů pro výzkumné účely.

---

## 📝 O projektu

Aplikace simuluje přihlašovací portál do systému EduPage. Uživatelé jsou vystaveni scénáři, který napodobuje běžné techniky využívané útočníky k získání přístupových údajů. 

**Důležité upozornění:** 
*   Aplikace **neukládá** žádná hesla ani citlivé údaje. 
*   Veškerý sběr dat je **anonymní**.
*   Po pokusu o přihlášení je uživateli zobrazeno edukační okno vysvětlující, že se jedná o test, spolu s informovaným souhlasem.

---

## 🏗️ Struktura projektu

Projekt je rozdělen do dvou hlavních částí:

### 1. Klientská aplikace (`/Client`)
Uživatelské rozhraní vytvořené v moderním prostředí **React + Vite**. 
- Navrženo tak, aby působilo důvěryhodně a napodobovalo univerzitní/firemní systém.
- Po kliknutí na přihlášení zobrazuje edukační modální okno.

### 2. Backend / Worker (`/worker`)
Serverová část běžící na technologii **Cloudflare Workers**.
- Zajišťuje bezpečné a anonymní započítávání návštěv a interakcí.
- Spravuje statistiky (počet zobrazení, kliknutí na tlačítka, věkové skupiny).
- Obsahuje chráněnou administrátorskou zónu pro export nasbíraných dat.

---

## ⚙️ Jak to funguje (z pohledu uživatele)

1.  **Vstup:** Uživatel navštíví stránku, která vypadá jako běžný přihlašovací formulář.
2.  **Akce:** Vyplní údaje a klikne na "Přihlášení".
3.  **Odhalení:** Místo přihlášení se objeví okno s informací, že jde o výzkumný projekt.
4.  **Edukace:** Uživatel si může stáhnout informovaný souhlas a dozvědět se více o tom, jak phishing rozpoznat.
5.  **Anonymní statistika:** Systém si zaznamená pouze fakt, že k akci došlo, a (pokud jej uživatel vyplní) věkovou skupinu.

---

## 🛠️ Použité technologie

- **Frontend:** React, Lucide React (ikony), Vanilla CSS.
- **Backend:** Cloudflare Workers (JavaScript).
- **Databáze:** Cloudflare KV (Key-Value storage) pro ukládání statistik.

---

## 📧 Kontakt

Pokud máte k projektu dotazy nebo se zajímáte o výsledky výzkumu, neváhejte mě kontaktovat:

- **Autor:** Lukáš Špánik
- **Instituce:** Univerzita Obrany
- **Email:** lukas.spanik@unob.cz

---
*Tento projekt slouží výhradně pro akademické účely a byl schválén etickou komisi Univerzity obrany.*
