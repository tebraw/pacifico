# Pacifico - Luxus Villa Booking Website

Eine moderne, responsive Website für das Buchen von Luxus-Villen mit interaktiver Aktivitäten-Auswahl. Das Projekt ist für lokale Tests optimiert und strukturiert für eine spätere Integration mit WordPress und Hostinger.

## 🏖️ Features

### Villen
- **Villa Pacifica**: Bis zu 16 Gäste, Meerblick, privater Pool
- **Villa Serenidad**: Bis zu 14 Gäste, tropischer Garten, Wellness-Bereich
- Detaillierte Villa-Profile mit Bildergalerien
- Preiskalkulation basierend auf Saison und Aufenthaltsdauer

### Aktivitäten
- **Drag & Drop Interface**: Aktivitäten können in den Warenkorb gezogen werden
- **Kategorien**: Abenteuer, Wellness, Wasser, Kultur
- **Interaktive Karten**: Visuell ansprechende Aktivitätskarten
- **Warenkorb-System**: Echzeit-Preisberechnung

### Buchungssystem
- Vollständiger Buchungsflow von Villa-Auswahl bis zur Bestätigung
- Gäste-Informationsformular
- Zahlungsoptionen (Kreditkarte, Banküberweisung, PayPal)
- Buchungsbestätigung mit Referenznummer

### Design
- **Moderne Ästhetik**: Abgerundete Karten, Luxus-Farbschema
- **Responsive Design**: Optimiert für alle Geräte
- **Animationen**: Sanfte Übergänge und Hover-Effekte
- **Benutzerfreundlich**: Intuitive Navigation und Interaktionen

## 🚀 Setup & Installation

### Voraussetzungen
- Moderne Webbrowser (Chrome, Firefox, Safari, Edge)
- Lokaler Webserver (optional, aber empfohlen)

### Lokale Entwicklung

1. **Repository klonen oder herunterladen**
   ```bash
   git clone [repository-url]
   cd Pacifico
   ```

2. **Lokalen Server starten**
   
   **Option A: Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Node.js**
   ```bash
   npx http-server
   ```
   
   **Option C: VS Code Live Server Extension**
   - Live Server Extension installieren
   - Rechtsklick auf `index.html` → "Open with Live Server"

3. **Website öffnen**
   - Browser öffnen: `http://localhost:8000`

### Direkte Datei-Öffnung
Die Website kann auch direkt über Doppelklick auf `index.html` geöffnet werden, jedoch können einige Features (localStorage, CORS) eingeschränkt sein.

## 📁 Projektstruktur

```
Pacifico/
├── index.html          # Startseite
├── villas.html         # Villa-Auswahl
├── activities.html     # Aktivitäten-Auswahl
├── booking.html        # Buchungsabschluss
├── css/
│   ├── main.css        # Basis-Styles und Variablen
│   ├── components.css  # UI-Komponenten
│   └── responsive.css  # Mobile/Tablet Optimierung
├── js/
│   ├── main.js         # Kern-Funktionalität
│   ├── booking.js      # Buchungssystem
│   └── activities.js   # Aktivitäten & Drag-Drop
├── images/
│   └── placeholder/    # Platzhalter für Bilder
├── assets/
│   └── icons/          # SVG Icons
└── .github/
    └── copilot-instructions.md
```

## 🎯 Benutzerflow

1. **Startseite**: Überblick über Villen und Aktivitäten
2. **Villa-Auswahl**: Detaillierte Villa-Information, Preise, Buchung
3. **Aktivitäten**: Drag & Drop Interface zum Zusammenstellen des Aktivitäten-Pakets
4. **Buchung**: Gästedaten eingeben und Buchung abschließen

## 🎨 Design-System

### Farbschema
- **Primary**: #2563eb (Blau)
- **Secondary**: #f59e0b (Orange)
- **Accent**: #10b981 (Grün)
- **Graustufen**: #f9fafb bis #111827

### Komponenten
- **Border Radius**: 8px bis 24px für abgerundete Ecken
- **Schatten**: Mehrschichtige Box-Shadows für Tiefe
- **Animationen**: 150ms bis 500ms Übergänge
- **Typography**: Inter Font Family

## 💾 Datenverwaltung

### localStorage
Die Website nutzt localStorage für:
- Ausgewählte Villa und Buchungsdaten
- Aktivitäten-Warenkorb
- Benutzer-Favoriten

### Datenstrukturen
```javascript
// Buchungsdaten
{
  villa: 'pacifica' | 'serenidad',
  dates: { checkin: 'YYYY-MM-DD', checkout: 'YYYY-MM-DD' },
  guests: '1-5' | '6-10' | ...,
  activities: [{ id, name, price, quantity }],
  totals: { villa: 0, activities: 0, taxes: 0, total: 0 }
}
```

## 🔧 Technische Details

### JavaScript-Klassen
- **PacificoApp**: Haupt-App-Logik, Navigation, Utilities
- **BookingSystem**: Villa-Buchung, Preisberechnung, Formulare
- **ActivitiesSystem**: Drag & Drop, Warenkorb, Filterung

### CSS-Architektur
- **CSS Custom Properties**: Für konsistente Design-Tokens
- **Mobile-First**: Responsive Design von klein zu groß
- **BEM-ähnliche Namenskonvention**: Für wartbaren CSS-Code

### Browser-Kompatibilität
- **Moderne Browser**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **JavaScript ES6+**: Klassen, Arrow Functions, Template Literals
- **CSS Grid & Flexbox**: Für moderne Layouts

## 🔮 WordPress Integration (Geplant)

### Vorbereitung für WordPress
- **Modulare Struktur**: Einfache Aufteilung in WordPress-Templates
- **CSS-Klassen**: WordPress-freundliche Namenskonventionen
- **JavaScript**: Keine jQuery-Abhängigkeiten
- **Responsive**: Mobile-first Design

### Empfohlene WordPress-Plugins
- **Contact Form 7**: Für Buchungsformulare
- **WooCommerce**: Für Zahlungsabwicklung
- **Advanced Custom Fields**: Für Villa-Datenfelder
- **WPML**: Für Mehrsprachigkeit

## 🚀 Deployment auf Hostinger

### Schritte für Live-Deployment
1. **Domain konfigurieren**: DNS-Einstellungen bei Hostinger
2. **Dateien hochladen**: Via File Manager oder FTP
3. **SSL-Zertifikat**: Aktivieren für HTTPS
4. **Performance**: CDN und Caching konfigurieren

### Optimierungen für Produktion
- **Bilder komprimieren**: WebP-Format verwenden
- **CSS/JS minifizieren**: Für bessere Ladezeiten
- **Browser-Caching**: Headers konfigurieren
- **Analytics**: Google Analytics integrieren

## 🔧 Anpassungen

### Bilder ersetzen
1. Echte Villa-Bilder in `/images/` hochladen
2. `.placeholder-image` CSS-Klassen durch `<img>`-Tags ersetzen
3. Responsive Bildgrößen definieren

### Inhalte anpassen
- **Texte**: Direkt in HTML-Dateien editieren
- **Preise**: In `js/booking.js` und `js/activities.js`
- **Villen-Daten**: In HTML und JavaScript-Objekten
- **Styling**: CSS-Variablen in `css/main.css`

### Neue Aktivitäten hinzufügen
1. HTML in `activities.html` erweitern
2. Aktivitäten-Objekt in `js/activities.js` aktualisieren
3. Entsprechende Kategorien zuweisen

## 🐛 Bekannte Limitationen

- **Platzhalter-Bilder**: Müssen durch echte Bilder ersetzt werden
- **Statische Daten**: Preise und Verfügbarkeit sind hardcoded
- **Keine Backend-Integration**: Buchungen werden nur lokal gespeichert
- **E-Mail-Versand**: Erfordert Server-seitige Implementierung

## 📞 Support & Kontakt

Für Fragen zur Website oder bei Problemen:
- **Dokumentation**: Diese README-Datei
- **Code-Kommentare**: Inline-Dokumentation in JS/CSS
- **Browser-Konsole**: Für Debugging-Informationen

## 📄 Lizenz

Dieses Projekt ist für den internen Gebrauch von Pacifico entwickelt. Alle Rechte vorbehalten.

---

**Entwickelt für Pacifico Luxury Villas - 2025**