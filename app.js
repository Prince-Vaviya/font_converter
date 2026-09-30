/**
 * Application Controller for Gujarati Unicode to Ghanshyam Converter
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const unicodeInput = document.getElementById('unicodeInput');
    const fontPreview = document.getElementById('fontPreview');
    const inputCharCount = document.getElementById('inputCharCount');
    const inputWordCount = document.getElementById('inputWordCount');
    const outputCharCount = document.getElementById('outputCharCount');
    const btnCopyCorel = document.getElementById('btnCopyCorel');
    const btnClear = document.getElementById('btnClear');
    const toastContainer = document.getElementById('toastContainer');

    let currentAsciiText = '';

    function performConversion() {
        const inputText = unicodeInput.value;

        // Statistics
        const charLen = inputText.length;
        const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
        
        if (inputCharCount) inputCharCount.textContent = `${charLen} character${charLen === 1 ? '' : 's'}`;
        if (inputWordCount) inputWordCount.textContent = `${words} word${words === 1 ? '' : 's'}`;

        if (!inputText) {
            currentAsciiText = '';
            if (fontPreview) fontPreview.value = '';
            if (outputCharCount) outputCharCount.textContent = '0 characters';
            return;
        }

        // Call conversion function from conv-uni-to-hari.js
        try {
            if (typeof conv_uni_to_hari === 'function') {
                currentAsciiText = conv_uni_to_hari(inputText);
                
                // Display in Ghanshyam font preview textarea
                if (fontPreview) {
                    fontPreview.value = currentAsciiText;
                }
                
                if (outputCharCount) outputCharCount.textContent = `${currentAsciiText.length} characters`;
            }
        } catch (err) {
            console.error('Conversion error:', err);
        }
    }

    function showToast(message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast show';
        
        let icon = '✅';
        if (type === 'warning') icon = '⚠️';
        if (type === 'error') icon = '❌';

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2500);
    }

    async function copyToClipboard() {
        if (!currentAsciiText) {
            showToast('⚠️ No text to copy! Please type some Gujarati text first.', 'warning');
            return;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(currentAsciiText);
            } else if (fontPreview) {
                fontPreview.select();
                document.execCommand('copy');
            }
            showToast('✅ Copied ASCII text for CorelDRAW!', 'success');
        } catch (err) {
            if (fontPreview) {
                fontPreview.select();
                document.execCommand('copy');
            }
            showToast('✅ Copied ASCII text for CorelDRAW!', 'success');
        }
    }

    // Event Listeners
    if (unicodeInput) {
        unicodeInput.addEventListener('input', performConversion);
        unicodeInput.addEventListener('propertychange', performConversion);
    }

    if (btnCopyCorel) {
        btnCopyCorel.addEventListener('click', copyToClipboard);
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            unicodeInput.value = '';
            performConversion();
            unicodeInput.focus();
            showToast('🗑️ Cleared text', 'success');
        });
    }

    // Initial conversion
    performConversion();
});
