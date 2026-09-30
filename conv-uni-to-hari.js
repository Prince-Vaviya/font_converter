//The algorithms on this page were written by Pritesh Patel and presented on http://www.anirdesh.com/gujarati website. You may not distribute this code under any circumstance without permission.

// Helper function for global replacement without regex escaping issues
function replaceAll(text, search, replace) {
    return text.split(search).join(replace);
}

function replace_array(a, b, text) {
    if (a.length !== b.length) return text;
    for (var i = 0; i < a.length; i++) {
        text = replaceAll(text, a[i], b[i]);
    }
    return text;
}

function conv_uni_to_hari(text) {
    // 1. The Array Split Method: Split the input into an array of lines
    var lines = text.split('\n');
    
    // 2. Process each line individually
    var processedLines = lines.map(function(line) {
        // Vowels
        var vowels_uni = ['ઓ','ઔ','ઑ','આ','ઍ','એ','ઐ','અ','ઇ','ઈ','ઉ','ઊ','ઋ','ૠ'];
        var vowels_hari = ['ai[','ai]','aiƒ','ai','aƒ','a[','a]','a','e','E','u','U','ä','ä'];

        // Consonants
        var cons_uni = ['ક','ખ','ગ','ઘ','ચ','છ','જ','ઝ','ટ','ઠ','ડ','ઢ','ણ','ત','થ','દ','ધ','ન','પ','ફ','બ','ભ','મ','ય','ર','લ','ળ','વ','શ','ષ','સ','હ'];
        var cons_hari = ['k','K','g','G','c','C','j','z','T','q','D','Q','N','t','Y','d','F','n','p','f','b','B','m','y','r','l','L','v','S','P','s','h'];
        var fCons_hari = ['k','K','g','G','c','C','j','z','T','q','D','Q','N','t','Y','d','F','n','p','f','b','B','m','y','l','L','v','S','P','s','h','x','X','#i'];

        // Half letters
        var hCons_uni = ['ક્','ખ્','ગ્','ઘ્','ચ્','છ્','જ્','ઝ્','ટ્','ઠ્','ડ્','ઢ્','ણ્','ત્','થ્','દ્','ધ્','ન્','પ્','ફ્','બ્','ભ્','મ્','ય્','લ્','ળ્','વ્','શ્','ષ્','સ્','હ્','ક્ષ્','જ્ઞ્','ત્ર્'];
        var hCons_hari = ['±','²','³','´','µ','C`','¶','z`','T`','q`','D`','Q`','·','R','¸','d`','¹','º','¼','f`','¾','¿','À','Á','Ã','Ç','Ä','Æ','O','A','h`','È','É','#'];

        // Numbers
        var nums_uni = ['૦','૧','૨','૩','૪','૫','૬','૭','૮','૯'];
        var nums_hari = ['0','1','2','3','4','5','6','7','8','9'];

        // Ordinary conjuncts of 2 characters that require virama
        var conj2_uni = ['સ્ત્ર','ત્ત','પ્ત','દ્ધ','શ્ચ','શ્ન','ત્ર','ષ્ટ','ષ્ઠ','દ્દ','ન્ન','લ્લ','જ્ર','દ્ર','ક્ક','જ્જ','ટ્ટ','ઠ્ઠ','ડ્ડ','ઢ્ઢ','દ્મ','શ્ર','હ્ય','હ્મ','દ્વ','શ્વ','દ્ર','દ્ય','ચ્ચ','ખ્ત','દ્ઘ','દ્ભ','ક્ષ','જ્ઞ','હૃ','રુ','રૂ','જી','જા'];
        var conj2_hari = ['à','_i','ß','Ü','á','â','#i','Ö','×','Ñ','Ò','Ó','Õ','W','Ê','Ì','Í','Î','Ï','Ð','Þ','~','H','M','o','V','W','w','µc','å','Û','Ý','x','X','ã','@','$','J','Ô'];

        var conj_mal = ['d`r','d`y','d`v','h`y','h`m','S`v','d`F','p`t','S`c','S`n','P`T','P`q','d`d','n`n','l`l','j`r','k`k','j`j','T`T','q`q','D`D','Q`Q','d`m','S`r','c`c','d`g','d`b','d`G','K`t'];
        var conj_fix = ['W','w','o','H','M','V','Ü','ß','á','â','Ö','×','Ñ','Ò','Ó','Õ','Ê','Ì','Í','Î','Ï','Ð','Þ','~','µc','Ù','Ú','Û','Ý','å'];

        // Punctuations vowels signs
        var vowelSigns_uni = ['ૌ','ો','ૉ','ા','ી','ુ','ૂ','ૃ','ૅ','ે','ૈ','ઁ','ં','ુ','ૂ','ૐ','॥','।','્','ઃ'];
        var vowelSigns_hari = ['i]','i[','iƒ','i',')','&','*','Z','ƒ','[',']','‡','>','‰','Š','ú','‘‘','‘','`',':'];

        // Punctuations
        var punct_uni = ['\"','’','‘','“','”','\\(','\\)','\\[','\\]'];
        var punct_hari = ["''",'"','\'','\'\'','""','\{','\}','˜','™'];

        // Begin substitutions 
        for (var i = 0; i < punct_uni.length; i++) {
            line = replaceAll(line, punct_uni[i], punct_hari[i]);
        }

        // Quotes
        line = replaceAll(line, "'' ", "\"\" ");
        line = line.replace(/\'\'$/g,"\"\""); // Keep regex for end-of-string match
        line = replaceAll(line, "' ", "\" ");
        line = line.replace(/\'$/g,"\"");     // Keep regex for end-of-string match

        // સ્ત્ર consonatns
        line = replaceAll(line, 'ર્સ્ત્રિં', 'Ià<>');
        line = replaceAll(line, 'ર્સ્ત્રિ', 'Ià<');
        line = replaceAll(line, 'સ્ત્રિ', 'Ià');

        // ત્ર consonants
        line = replaceAll(line, 'ર્ત્રિં', '(#i<>');
        line = replaceAll(line, 'ર્ત્રિ', '(#i<');
        line = replaceAll(line, 'ત્રિ', '(#i');

        // Move I and ( after hCons + joined conjuncts
        for (var i = 0; i < hCons_hari.length; i++) {
            for (var j = 0; j < conj2_hari.length; j++) {
                var h_uni = hCons_uni[i], c2_uni = conj2_uni[j];
                var h_hari = hCons_hari[i], c2_hari = conj2_hari[j];

                line = replaceAll(line, 'ર્' + h_uni + c2_uni + 'િં', 'I' + h_hari + c2_hari + '<>');
                line = replaceAll(line, 'ર્' + h_uni + c2_uni + 'િ', 'I' + h_hari + c2_hari + '<');
                line = replaceAll(line, h_uni + c2_uni + 'િ', 'I' + h_hari + c2_hari);
                line = replaceAll(line, 'ર્' + c2_uni + 'િં', '(' + c2_hari + '<>');
                line = replaceAll(line, 'ર્' + c2_uni + 'િ', '(' + c2_hari + '<');
                line = replaceAll(line, 'ર્' + c2_uni + 'િ', '(' + c2_hari);
            }
        }

        var rxr_uni = ['્રિં','્રિ','્રિં','્રિ','્રિં','્રિ'];
        var rxr_hari = ['\\<>','\\<','|<>','|<','^<>','^<'];
        
        // Move I and ( after hCons + consonants + r (rpra)
        for (var i = 0; i < hCons_hari.length; i++) {
            for (var j = 0; j < cons_hari.length; j++) {
                for (var k = 0; k < rxr_hari.length; k++) {
                    line = replaceAll(line, 'ર્' + hCons_uni[i] + cons_uni[j] + rxr_uni[k], 'I' + hCons_hari[i] + cons_hari[j] + rxr_hari[k]);
                    line = replaceAll(line, 'ર્' + cons_uni[j] + rxr_uni[k], '(' + cons_hari[j] + rxr_hari[k]);
                }
            }
        }

        // Move I and ( after conjucts and consonants including r
        for (var i = 0; i < hCons_hari.length; i++) {
            for (var j = 0; j < cons_hari.length; j++) {
                line = replaceAll(line, hCons_uni[i] + cons_uni[j] + '્રિ', 'I' + hCons_hari[i] + cons_hari[j] + '\\');
                line = replaceAll(line, cons_uni[j] + '્રિ', '(' + cons_hari[j] + '\\');
            }
        }

        // Move I and ( after hCons + consonants
        for (var i = 0; i < hCons_hari.length; i++) {
            for (var j = 0; j < cons_hari.length; j++) {
                line = replaceAll(line, 'ર્' + hCons_uni[i] + cons_uni[j] + 'િં', 'I' + hCons_hari[i] + cons_hari[j] + '<>');
                line = replaceAll(line, 'ર્' + hCons_uni[i] + cons_uni[j] + 'િ', 'I' + hCons_hari[i] + cons_hari[j] + '<');
                line = replaceAll(line, hCons_uni[i] + cons_uni[j] + 'િ', 'I' + hCons_hari[i] + cons_hari[j]);
            }
        }

        for (var i = 0; i < conj_mal.length; i++) {
            line = replaceAll(line, conj_mal[i], conj_fix[i]);
        }

        for (var j = 0; j < cons_hari.length; j++) {
            line = replaceAll(line, 'ર્' + cons_uni[j] + 'િં', '(' + cons_hari[j] + '<>');
            line = replaceAll(line, 'ર્' + cons_uni[j] + 'િ', '(' + cons_hari[j] + '<');
            line = replaceAll(line, cons_uni[j] + 'િ', '(' + cons_hari[j]);
        }

        // Substitute 'i' vowel sign + XX + r + (anusvara|no anusvara)
        var irxVowelN_hari = ['†','<>','<'];
        var irxVowelN_uni = ['િં','િં','િ'];
        for (var h = 0; h < hCons_hari.length; h++) {
            for (var i = 0; i < cons_hari.length; i++) {
                for (var j = 0; j < irxVowelN_hari.length; j++) {
                    line = replaceAll(line, 'ર્' + hCons_uni[h] + cons_uni[i] + irxVowelN_uni[j], 'I' + hCons_hari[h] + cons_hari[i] + irxVowelN_hari[j]);
                }
            }
        }
        for (var h = 0; h < cons_hari.length; h++) {
            for (var i = 0; i < irxVowelN_hari.length; i++) {
                line = replaceAll(line, 'ર્' + cons_uni[h] + irxVowelN_uni[i], '(' + cons_hari[h] + irxVowelN_hari[i]);
            }
        }

        // Move singles
        for (var i = 0; i < cons_hari.length; i++) {
            line = replaceAll(line, cons_uni[i] + 'િ', '(' + cons_hari[i]);
        }

        // Begin punctuation of the form rXVowelN - r + character + vowel + (anusvara|no anusvara)
        var rxVowelN_uni2 = ['્રૌં','્રોં','્રૈં','્રેં','્રું','્રૂં','્રીં','્રાં','્રં','ૌં','ોં','ૈં','ેં','ું','ૂં','ીં','ાં','ં',
        '્રૌ','્રો','્રૈ','્રે','્રુ','્રૂ','્રી','્રા','્ર','ૌ','ો','ૈ','ે','ુ','ૂ','ી','ા',''];
        var rxVowelN_hari2 = ['\\i]†','\\i[†','\\]†','\\[†','\\&†','\\*†','\\…','\\i†','\\†','i]†','i[†',']†','[†','&†','*†','…','i†','†','\\i]<','\\i[<','\\]<','\\[<','\\&<','\\*<','\\„','\\i<','\\<','i]<','i[<',']<','[<','&<','*<','„','i<','<'];
        
        for (var h = 0; h < hCons_hari.length; h++) {
            for (var i = 0; i < cons_hari.length; i++) {
                for (var j = 0; j < rxVowelN_hari2.length; j++) {
                    line = replaceAll(line, 'ર્' + hCons_uni[h] + cons_uni[i] + rxVowelN_uni2[j], hCons_hari[h] + cons_hari[i] + rxVowelN_hari2[j]);
                }
            }
        }
        for (var i = 0; i < cons_hari.length; i++) {
            for (var j = 0; j < rxVowelN_hari2.length; j++) {
                line = replaceAll(line, 'ર્' + cons_uni[i] + rxVowelN_uni2[j], cons_hari[i] + rxVowelN_hari2[j]);
            }
        }

        // Fix r conjuncts
        var rCons = ['`r','\\','^','|'];
        for (var i = 0; i < 32; i++) {
            line = replaceAll(line, hCons_hari[i] + 'r', cons_hari[i] + '\\');
        }

        var rConj1_1 = ['k','K','g','G','c','C','j','z','t','T','q','D','Q','N','t','Y','d','F','n','p','f','b','B','m','y','l','L','v','S','P','s','h'];
        var rConj1_2 = ['k|','K\\','g\\','G\\','c','C^','Õ','z^','#i','T^','q^','D^','Q^','N\\','#i','Y\\','W','F\\','n\\','p\\','f|','b\\','B\\','m\\','y\\','l\\','L^','v\\','~','P\\','s\\','ã'];
        for (var i = 0; i < rConj1_1.length; i++) {
            for (var j = 0; j < rCons.length; j++) {
                line = replaceAll(line, rConj1_1[i] + rCons[j], rConj1_2[i]);
            }
        }

        var rConj2_1 = ['Ü','ß','á','â','Ö','×','Ñ','Ò','Ó','Í','Î','Ï','Ð'];
        for (var i = 0; i < rConj2_1.length; i++) {
            line = replaceAll(line, 'I' + rConj2_1[i], '(' + rConj2_1[i]);
        }

        // Begin other ordinary replacements
        line = replace_array(conj2_uni, conj2_hari, line);
        line = replace_array(hCons_uni, hCons_hari, line);
        line = replace_array(cons_uni, cons_hari, line);
        line = replace_array(vowels_uni, vowels_hari, line);
        line = replace_array(vowelSigns_uni, vowelSigns_hari, line);
        line = replace_array(nums_uni, nums_hari, line);

        var rConj3_1 = ['±','²','³','´','µ','C`','¶','z`','T`','q`','D`','Q`','·','R','¸','d`','¹','º','¼','f`','¾','¿','À','Á','Ã','Ç','Ä','Æ','O','A','h`'];
        var rConj3_2 = ['k|','K\\','g\\','G\\','c','C^','Õ','z^','T^','q^','D^','Q^','N\\','#i','Y\\','W','F\\','n\\','p\\','f|','b\\','B\\','m\\','y\\','l\\','L^','v\\','~','P\\','s\\','h`r'];
        for (var i = 0; i < rConj3_1.length; i++) {
            line = replaceAll(line, rConj3_1[i] + 'r', rConj3_2[i]);
        }

        // Fix viram conjuncts
        for (var i = 0; i < hCons_hari.length; i++) {
            line = replaceAll(line, hCons_hari[i] + ' ', fCons_hari[i] + '` ');
        }

        // Other fixes for clean up
        var pat_final = ["IRt","Rt", "_i`", "¹@", "¹\\$", "±@", "±\\$", "x`", "Æc", "ઽ", "±P", "Ix", "Io"];
        var rep_final = ["(_i","_i", "_", "F\\&", "F\\*", "k|&", "k|*", "È", "á", "Ę", "x", "\\(x", "\\(o"];
        line = replace_array(pat_final, rep_final, line);
        
        line = replaceAll(line, '‍', ''); // Remove ZWJ
        line = replaceAll(line, '‌', ''); // Remove ZWNJ

        // fix conjucts with y
        var y_hari = ['C','Z','T','Q','D','Q'];
        for (var i = 0; i < y_hari.length; i++) {
            line = replaceAll(line, y_hari[i] + '`y', y_hari[i] + 'Â');
        }

        return line;
    });

    // 3. Join them back together with native line breaks
    return processedLines.join('\n');
}