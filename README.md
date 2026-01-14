# KV & TP FULL Site Monitoring

Questo progetto utilizza [Playwright](https://playwright.dev/) per monitorare lo stato e il contenuto dei siti Kruidvat Nederland, Kruidvat Belgium e Trekpleister, eseguendo test automatici su Chromium.

## Funzionalità principali

- **Test end-to-end** per homepage, ricerca, carrello, categorie e contenuti specifici.
- **Gestione automatica del cookie banner** in tutti i test.
- **Configurazione centralizzata dei siti** in `config/sites.config.ts`.
- **Timeout e retry configurabili** per ogni browser.
- **GitHub Actions** per esecuzione automatica ogni 20 minuti e su richiesta.
- **Notifiche Telegram e Slack** in caso di fallimento dei test.
- **Report HTML** dei test generati e salvati come artefatti.

## Struttura del progetto

- `tests/`  
  Contiene tutti i test Playwright suddivisi per sito e funzionalità.
- `utils/`  
  Helper per gestione cookie, setup pagina, ecc.
- `config/sites.config.ts`  
  Configurazione centralizzata degli URL, titoli e contenuti attesi per ogni sito.
- `.github/workflows/scheduler.yml`  
  Workflow GitHub Actions per esecuzione automatica dei test su Chromium.
- `playwright.config.ts`  
  Configurazione Playwright per timeout, header, progetti browser, ecc.

## Come eseguire i test localmente

1. Installa le dipendenze:
   ```bash
   npm ci
   ```
2. Installa i browser Playwright:
   ```bash
   npx playwright install --with-deps
   ```
3. Esegui tutti i test:
   ```bash
   npx playwright test
   ```
4. Esegui i test su Chromium:
   ```bash
   npx playwright test --project=chromium
   ```
5. Esegui un singolo test file:
   ```bash
   npx playwright test tests/kruidvat_nl/01-kvn-homepage.spec.ts
   ```
6. Esegui un singolo test per nome:
   ```bash
   npx playwright test --grep "should have correct page title"
   ```
7. Esegui i test in modalità headed (con browser visibile):
   ```bash
   npx playwright test --headed
   ```

## Come funziona il monitoraggio automatico

- Il workflow GitHub Actions (`.github/workflows/scheduler.yml`) esegue i test ogni 20 minuti su Chromium.
- In caso di fallimento, viene inviata una notifica Telegram (se configurati i segreti `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID`) **e una notifica Slack** (se configurato il segreto `SLACK_WEBHOOK_URL`).
- I report dei test sono disponibili come artefatti scaricabili.

## Notifica Slack

Per ricevere notifiche su Slack in caso di fallimento dei test, aggiungi il segreto `SLACK_WEBHOOK_URL` nelle impostazioni del repository GitHub.  
La notifica viene inviata automaticamente dal workflow in caso di errore.

## Personalizzazione

- Modifica `config/sites.config.ts` per aggiornare URL, titoli e contenuti attesi.
- Personalizza i test in `tests/` per aggiungere nuove verifiche o funzionalità.
- Aggiorna `playwright.config.ts` per cambiare timeout, header, progetti, ecc.

## Requisiti

- Node.js >= 20
- Playwright >= 1.40
- Un account Telegram per ricevere notifiche (opzionale)
- Un webhook Slack per ricevere notifiche (opzionale)

## Supporto

Per problemi o richieste, apri una issue su GitHub.

---