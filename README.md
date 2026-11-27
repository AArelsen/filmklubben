# Filmklubben Rulletekst

Filmen er slutt. Samtalen begynner.

Et nettsted for filmartikler, filmanmeldelser og filmkvelder med påmelding.
Innholdet administreres i Payload CMS.

## Teknologier

- Next.js og React
- TypeScript
- Payload CMS
- SQLite
- Vanlig CSS

## Krav

- Node.js 22.23.4 eller en nyere versjon i Node 22-serien
- npm


## Lokal installasjon

1. Pakk ut prosjektet og åpne en terminal i prosjektmappen.
2. Installer avhengighetene:

   ```bash
   npm ci
   ```

3. Kopier eksempelfilen:

   ```bash
   cp .env.example .env
   ```

4. Åpne `.env`. Behold `DATABASE_URL=file:./.db`, og erstatt
   `YOUR_SECRET_HERE` med en lang, tilfeldig og privat verdi for
   `PAYLOAD_SECRET`. Ikke del eller legg `.env` i Git.

5. Start utviklingsserveren:

   ```bash
   npm run dev
   ```

6. Åpne nettstedet på http://localhost:3000.
7. Åpne http://localhost:3000/admin for å opprette den første
   administratorkontoen.

SQLite bruker en lokal databasefil. Du trenger ikke en separat
databaseserver.

## Eksempelinnhold

Etter at `.env` er konfigurert, kan du opprette eksempelinnhold:

1. Sett `DEMO_PASSWORD` i `.env` til et eget testpassord med minst
   12 tegn. Erstatt eksempelverdien.
2. Kjør kommandoen fra prosjektmappen:

   ```bash
   npm run seed:demo
   ```

Kommandoen oppretter et eksempelbilde, to brukere, en artikkel,
en filmanmeldelse og en filmkveld.

Demobrukere:

- `anna@example.com`
- `erik@example.com`

Begge nye demobrukere får passordet du satte i `DEMO_PASSWORD`.
Eksisterende brukeres passord endres ikke.

Forsiden fylles med eksempelblokker bare hvis den ikke har blokker fra før.
Kommandoen kan kjøres flere ganger uten å opprette de samme
demopostene på nytt.

## Opprette innhold i admin

Ved oppstart med en ny database er nettstedet tomt.

1. Opprett den første administratorkontoen på `/admin`.
2. Opprett minst én ekstra bruker under Users. Legg til navn
   og profilbilde for begge brukerne.
3. Last opp bilder under Media og fyll inn alternativ tekst.
4. Opprett artikler under Articles og anmeldelser under Film Reviews.
   Velg forfatter, bilde og publiseringsdato.
5. Opprett en filmkveld under Film Events.
6. Åpne Forside og legg til blokker for filmkvelder, artikler
   og anmeldelser. Velg innhold, ordne rekkefølgen og lagre.

Bruk unike URL-navn (slug), for eksempel `min-forste-artikkel`.
Logg inn som den andre brukeren og opprett også innhold med denne kontoen.

Påmeldinger opprettes gjennom skjemaet på den enkelte filmkvelden.
De kan kontrolleres under Registrations i admin.


## Kontroll av prosjektet

Kjør kodekontroll:

```bash
npm run lint
```

Lag en produksjonsbygging:

```bash
npm run build
```

Stopp eventuell utviklingsserver før du starter produksjonsserveren:

```bash
npm run start
```

Åpne http://localhost:3000.

Etter endringer i collections eller globals kan Payload-typene
oppdateres med:

```bash
npm run generate:types
```

`src/payload-types.ts` genereres automatisk og skal ikke redigeres manuelt.