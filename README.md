# wg-annonce-aktualisieren
Das Skript ermöglicht es, eine bestimmte, selbst eingestellte Anzeige bei WG-Gesucht zu aktualisieren. Durch das Aktualisieren kann die Anzeige unter den ersten Treffern gehalten werden und ist so besser auffindbar. WG-Gesucht hält für diesen Zweck eine "Aktualisieren"-Button bereit. Mein Skript nutzt Puppeteer und den headless mode von Chrome, bzw. Chromium um sich in den Account einzuloggen, zur "Bearbeiten & Aktualisieren"-Seite mit der jeweiligen Anzeige zu navigieren und dort auf "Aktualisieren" zu klicken.

# Anwendung
Ich habe das Skript auf meinem RP3 mit RaspiOS light laufen lassen. Die Ausführung des Skripts erfolgte manuell via ssh vom Handy oder vom PC aus. Eine Automatisierung zur z.B. täglichen Ausführung sollte theoretisch möglich sein, erfordert jedoch weitere Schritte und wurde daher von mir nicht umgesetzt.

# Vorbereitung
Das Skript benötigt:
- NodeJS (https://nodejs.org/en/download/)
- Puppeteer (https://github.com/puppeteer/puppeteer.git)
- Puppeteer-Extra-Plugin (https://github.com/berstend/puppeteer-extra.git)
- Puppeteer-Extra-Plugin-Stealth (s.o.)
Puppeteer und die erforderlichen Plugins können auch direkt über npm installiert werden.

Die Login-Daten und der Direktlink zur Anzeige müssen oben im Skript eingetragen werden. Da diese Informationen im Skript anschließend im Klartext vorliegen, sollte sichergestellt werden, dass kein Unbefugter Zugriff auf das Skript hat.
Um den Direktlink zu erhalten ist ein einmaliges Einloggen bei WG-Gesucht erforderlich. Dort klickt man bei der gewünschten Anzeige "Bearbeiten" an und kopiert die URL der Bearbeiten-Seite.

Unter Umständen kann es erforderlich sein, den executablePath zum chromium-browser explizit anzugeben. Bei meinen Tests war dies unter RaspiOS erforderlich. Unter Windows 10 mit bereits installiertem Chrome-Browser waren keine Anpassungen nötig. Der Pfad kann im standardmäßig auskommentierten Eintrag "executablePath: '/usr/bin/chromium-browser'," vorgegeben werden.

# Hinweis
Die Benutzung meines Skriptes erfolgt auf eigene Verantwortung. Ich übernehme keine Haftung für eventuelle Folgen, die durch die vorgesehene oder eine eventuelle missbräuchliche Nutzung dieses Skriptes entstehen.
