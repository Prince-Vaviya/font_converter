# Gujarati to Ghanshyam Font Converter

A simple, fast web tool to convert normal Gujarati text (Unicode) into **Ghanshyam font code (ASCII)** so you can easily copy and paste it into **CorelDRAW, Photoshop, PageMaker, or Illustrator**.

---

## 🚀 How to Use (CorelDRAW Workflow)

1. Open `index.html` in any web browser.
2. Type or paste your Gujarati text in the **Left Box (Input)**.
3. Check the **Right Box (Output)** to see how it looks in the Ghanshyam font.
4. Click the **📋 Copy** button.
5. In CorelDRAW:
   - Select the **Text Tool** (`F8`) and click on your canvas.
   - Paste (`Ctrl + V`).
   - Change the font family dropdown to **Ghanshyam**.
   - Done! Your Gujarati text will appear perfectly.

---

## 💡 How Font Conversion Works (In Simple Words)

### 1. Unicode vs Legacy Fonts
* **Normal Gujarati (Unicode):** This is what you type on your phone, WhatsApp, or Google. Every device understands it automatically.
* **Ghanshyam Font (Legacy ASCII):** Older design software like CorelDRAW and PageMaker was made before Gujarati Unicode was widely supported. To type Gujarati, font creators replaced standard English keyboard characters (like `a`, `b`, `c`, `(`, `\`) with Gujarati letter shapes.

When you copy text from this converter, you are copying raw English/ASCII characters. Once you apply the **Ghanshyam** font in CorelDRAW, those English characters turn into Gujarati letters.

---

### 2. Why Can't We Just Do a Simple Find & Replace?

Gujarati writing has rules that make conversion tricky:

1. **Rasva-i (`િ`) Position Flip:**
   * In Unicode, you type the letter first, then the matra: `ક` + `િ` = `કિ`.
   * In Ghanshyam font, the visual symbol `(` must come **before** the letter: `(` + `k` = `(k`.
   * For complex words like `પ્રિન્સ`, the `(` has to jump before the whole cluster: `(p\`.

2. **Half Letters & Conjuncts (જોડાક્ષર):**
   * Words like `સ્`, `ન્`, `ક્ષ`, `જ્ઞ`, `શ્ર` use special single-key characters or Alt-codes (for example, `ન્` is character code `º`).

3. **Reph (Half-R on top, like `સૂર્ય`):**
   * In Unicode, `ર + ્` is typed before the letter.
   * In Ghanshyam font, the top hook `<` is placed after the letter.

---

## 📝 Example Word Conversions

| Normal Gujarati (Unicode) | Ghanshyam ASCII (Copied) | Notes |
| :--- | :--- | :--- |
| **પ્રિન્સ વાવિયા** | `(p\ºs vi(vyi` | `(` = િ, `p\` = પ્ર, `º` = ન્, `s` = સ, `vi(vyi` = વાવિયા |
| **આકાશ** | `aikiS` | `a` = અ, `i` = ા (`ai` = આ), `k` = ક, `S` = શ |
| **શ્રી ગણેશાય નમઃ** | `~) gN[Siy nm:` | `~)` = શ્રી, `g` = ગ, `N[` = ણે, `S` = શ |
| **નમસ્તે ભારત** | `nmAt[ Birt` | `n` = ન, `m` = મ, `At[` = સ્તે, `B` = ભ |
| **સૂર્ય** | `s*y<` | `s*` = સૂ, `y<` = ર્ય |

---

## 📂 Files in this Project

* `index.html` - The clean, two-panel web page.
* `style.css` - Dark theme and `@font-face` setup to load the Ghanshyam font.
* `conv-uni-to-hari.js` - The conversion script with all Gujarati grammar and mapping rules.
* `app.js` - Connects the input typing, output preview, and clipboard copy.
* `GHANSHYAM.TTF` - The TrueType font file.