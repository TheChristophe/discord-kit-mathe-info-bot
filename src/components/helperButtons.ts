import { ComponentDescriptor } from '../componentDescriptor';
import { Client, Constants, Interaction } from 'discord.js';
import responses from '../genericResponses';
import { DATA_COLLECITON_ID, LINKS_ID, RULES_ID, STRUCTURE_ID } from '../commands/helperButtons';

const rulesText = `__Regeln__
In Kurzfassung: Bitte nett sein! :3

Bitte verhalte dich respektvoll gegenüber deinen Kommilitonen und verzichte auf rassistische, diskriminierende, unerwünschte oder beleidigende Worte, egal wem gegenüber. Wir sind ein offener und inklusiver Raum; offensive und böswillige Geschöpfe sind kein Teil davon. Auch spammen und ungefragte & ungekennzeichnete Werbung sind für ein Miteinander zu vermeiden.

Zum Schutze Minderjähriger (unter 18 Jahren) und derjenigen, die diese Inhalte nicht sehen möchte, sind NSFW-Inhalte (Not Safe for Work, bspw. Nacktheit) in einen als solchen markierten Kanal unter den Kategorien Spam zu versenden—also insbesondere nicht in chat. Illegale Inhalte und oben genannten Regelungen sind auch dort nicht ausgenommen. Hinweis: KIT Mathe Info befolgt die Allgemeinen Geschäftsbedingungen von Discord und deutsches Recht, insbesondere bezüglich Inhalten für Erwachsene.

Im Weiteren bist du gebeten den Server nicht mehrfach wiederholt zu verlassen und beizutreten.

__Moderation__
Wenn die Moderation und Administration dich auf etwas hinweist, so ist dem auch nachzugehen.

Bei Schwierigkeiten, Vorschlägen oder sonstigen Kummer bitte einfach die @Moderation pingen oder in moderation melden.`;

const structureText = `__Aufbau__
In Discord gibt es Text- und Sprachkanäle. In den Textkanälen kann ausschließlich geschrieben, in Sprachkanälen ausschließlich gesprochen werden. Man kann gleichzeitig in einem Text- und einem Sprachkanal sein.

In den Textkanälen können Text, GIFs, Emoji, Bilder oder andere Dateien ausgetauscht werden. Nachrichten unterstützen einfaches Markdown (https://support.discord.com/hc/de/articles/210298617). Übrigens kannst du deine Nachrichten auch editieren, indem du über sie hoverst und dann die rechts erscheinenden Punkte anklickst.

__Kanäle & Kategorien__
Ordnung ist nicht nur generell und im Studium wichtig, sondern auch hier zu finden. Wenn du eine Kategorie oder einen Kanal nicht sehen möchtest, bspw. für einen reinen Fachaustausch, kannst du diese einklappen bzw. stummschalten.

__Allgemein__
Unter Allgemein findest du allerhand ums Studieren und Studentenleben an sich. In chat erreichst du wohl die meisten, über ein fröhliches Hallöchen freuen wir uns! Auf direkter Suche nach Kommilitonen oder Erstsemester-Fragen? Schau doch in ersti & lerngruppensuche vorbei. bot eignet sich, um verantwortungsvoll mit den Bots zu spielen. Geheimtipp: !mensa. Frust herauslassen geschieht idealerweise in rant.

__Fachschaft__
Du möchtest die Fachschaft etwas näher kennenlernen? Oder du hast eine Frage zu deinem Studium, aber eine E-Mail ist dir gerade zu viel? Dann steht dir der Kanal an-die-fachschaft zur Verfügung mit direkter Anbindung an Fachschaftsinfrastruktur.`;

const structureText2 = `__Module__
Nachfolgend der Austausch über verschiedenste Module in Programmieren, Sonstiges Info, Mathe, Stammmodule und Ergänzungsfach. Wenn dir eine mögliche Abkürzung o. ä. fehlt, frage am besten in chat nach. Wünschst du dir die Unterstützung höherer Semester bei Blättern, so denke bitte daran, die Aufgabenstellung in Form des Übungsblattes oder eines Bildschirmausschnittes der jeweiligen Fragen anzuhängen. Nicht jeder möchte allen ILIAS-Kursen beitreten. Danke für dein Verständnis. Teilweise schwebt auch der ein oder andere Tutor rum, der dir ein paar allgemeinere Tipps geben kann.

__Spam (Offiziell)__
Spam (Offiziell) vereint ein paar Kanäle, die sich über die Zeit etabliert haben, einerseits um ein paar Gruppen einen dedizierten Platz zu geben andererseits um chat zu entlasten. Besonders hervorhebenswert sind dabei der gamer-channel, katzen, politik und natürlich es-ist-leider-ein-fehler-aufgetreten für unser heiß geliebtes ILIAS.

__Spam (Temporär)__
Spannend zu verfolgen ist Spam (Temporär), in dem alle die Berechtigung haben einen eigenen Kanal für ein bestimmtes Thema o. ä. zu erstellen, sowie zu etablieren. Achtung, auch löschen darf diese jeder! Die Verwaltung übernimmt @Joshua; probiere es einfach aus mit den Befehlen unter $help. Veränderungen finden sich dabei in channel-announcer unter Spam (Offiziell).

__Sprachkanäle__
Ganz zum Schluss unsere einsamen Sprachkanäle. Informatiker sind etwas schüchtern, vielleicht schaffst du es sie zu motivieren und den Kanälen frischen Wind zu bringen. :sweat_smile:`;

const linksText = `Generell kannst du ein Ergebnis in der Suchmaschine deiner Wahl mit KIT Suchbegriff finden. Hier dennoch häufig verwendete Links.
__KIT__
* KIT: https://www.kit.edu/
* Studierendenservice (SLE): https://www.sle.kit.edu/wirueberuns/studierendenservice.php
__Portale__
* Self-Service Portal des SCC: https://my.scc.kit.edu/
* Campus Management für Studierende (CAS): https://campus.studium.kit.edu/
* Integriertes Lern-, Informations- und Arbeitskooperations-System (ILIAS): https://ilias.studium.kit.edu/
* KIT-VPN (evtl. Spezialkonfiguration notwendig): http://www.scc.kit.edu/dienste/openvpn.php
__Informatik-Fakultät__
* Informatik-Fakultät: https://www.informatik.kit.edu/index.php
* Informatik Studiengangservice (ISS): https://www.informatik.kit.edu/iss.php
* Informatik Modulhandbücher, Prüfungsordnung, etc.: https://www.informatik.kit.edu/formulare.php
* Informatik Klausurtermine: https://www.informatik.kit.edu/9581.php
__Mathe-Fakultät__
* Mathematik-Fakultät: https://www.math.kit.edu/de
* Mathematik Klausurtermine: https://www.math.kit.edu/lehre/seite/klausurtermine/de
__Fachschaft__
* Fachschaft Mathematik Informatik (FSMI): https://www.fsmi.uni-karlsruhe.de/
* Einführungswoche (O-Phase): https://o-phase.com/de/
* Ersti-Info: https://o-phase.com/de/ws2021/ersti_info.pdf
* Klausurenverkauf: https://www.fsmi.uni-karlsruhe.de/odie/web/
__Beratung__
* MINT-Kolleg: http://www.mint-kolleg.kit.edu/Studienbegleitung.php
* Zentrum für Informationen und Beratung (ZIB): http://www.sle.kit.edu/imstudium/zib.php
__Verschiedenes__
* KIT Mathe Info Discord: https://discord.gg/D3RCCMj
* ILIAS-Downloader: https://github.com/Garmelon/PFERD
* Subreddit: https://www.reddit.com/r/KaIT/
* Mensaplan: https://www.sw-ka.de/en/essen/
* Interfakultativer Erstiserver: https://discord.gg/ZADFRNu`;

const gdprText = `• join-boost-log 
  • Was: server-beitritte und server-boosts
  • Wieso: standard-discord feature, zum bedanken bei server boostern
• join-leave-log 
  • Was: server-beitritte und server-verlassen
  • Wieso: alarmieren über mögliche trolle, spammer, [...]
• member-log 
  • Was: namens-änderungen, profilbild-änderungen
  • Wieso: alarmieren über offensive oder schockierende namen & bilder
• message-log 
  • Was: gelöschte nachrichten
  • Wieso: kontextnachvollziehung für konfliktfälle, bspw. fälle wo beleidigungen o.ä. nachträglich gelöscht werden sollten
• server-log 
  • Was: änderungen an server-channel, inkl. beschreibung, namen, permissions, hauptsächlich durch die moderation
  • Wieso: benachrichtigung für andere moderatoren über durchgeführte änderungen
• voice-log 
  • Was: beitreten und verlassen der voice-channels
  • Wieso: kontextnachvollziehung für konfliktfälle, bspw. nutzern die kurz beitreten um zu stören 
• dyno-backup-log 
  • Was: untermenge der oben genannten daten
  • Wieso: redundanz, falls @Carl zeitweise nicht verfügbar ist

Für weitere Informationen, siehe https://discord.com/channels/501365485837877268/501374594414936075/872545269890306058`;

export const helperButtons: ComponentDescriptor = {
    setup: (client: Client) => {
        client.on(Constants.Events.INTERACTION_CREATE, async (interaction: Interaction) => {
            if (!interaction.isButton() || interaction.guildId === null) {
                return;
            }

            switch (interaction.customId) {
                case RULES_ID:
                    {
                        await interaction.reply({ content: rulesText, ephemeral: true });
                    }
                    break;
                case STRUCTURE_ID:
                    {
                        await interaction.reply({ content: structureText, ephemeral: true });
                        await interaction.followUp({ content: structureText2, ephemeral: true });
                    }
                    break;
                case LINKS_ID:
                    {
                        await interaction.reply({ content: linksText, ephemeral: true });
                    }
                    break;
                case DATA_COLLECITON_ID:
                    {
                        await interaction.reply({ content: gdprText, ephemeral: true });
                    }
                    break;
                default: {
                    await interaction.reply({ content: responses.SUCCESS, ephemeral: true });
                }
            }

            return;
        });
    },
    name: 'HelperButtons',
};
