/**
 * Main Application Logic for Gujarati ➔ Ghanshyam Converter
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // DOM Elements
    const unicodeInput = document.getElementById('unicodeInput');
    const outputDisplay = document.getElementById('outputDisplay');
    const inputCharCount = document.getElementById('inputCharCount');
    const inputWordCount = document.getElementById('inputWordCount');
    const outputCharCount = document.getElementById('outputCharCount');
    
    const btnCopyCorel = document.getElementById('btnCopyCorel');
    const btnClear = document.getElementById('btnClear');
    const toastContainer = document.getElementById('toastContainer');

    // Current State
    let currentAsciiOutput = '';

    /**
     * Perform conversion from Unicode to Ghanshyam using conv_uni_to_hari
     */
    function performConversion() {
        const inputText = unicodeInput.value;

        // Update input stats
        const charLen = inputText.length;
        const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
        
        inputCharCount.textContent = `${charLen} character${charLen === 1 ? '' : 's'}`;
        inputWordCount.textContent = `${words} word${words === 1 ? '' : 's'}`;

        if (!inputText.trim()) {
            currentAsciiOutput = '';
            outputDisplay.value = '';
            outputCharCount.textContent = '0 characters';
            return;
        }

        // Convert using the established conv_uni_to_hari function
        try {
            if (typeof conv_uni_to_hari === 'function') {
                currentAsciiOutput = conv_uni_to_hari(inputText);
            } else {
                currentAsciiOutput = inputText;
            }
        } catch (e) {
            console.error('Conversion error:', e);
            currentAsciiOutput = inputText;
        }

        outputDisplay.value = currentAsciiOutput;
        outputCharCount.textContent = `${currentAsciiOutput.length} characters`;
    }

    /**
     * Copy text to clipboard
     */
    async function copyToClipboard(text) {
        if (!text) {
            showToast('⚠️ No text to copy! Please type some Gujarati text first.', 'warning');
            return;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                outputDisplay.select();
                document.execCommand('copy');
            }

            showToast('✅ Copied ASCII text for CorelDRAW!', 'success');
        } catch (err) {
            console.error('Failed to copy:', err);
            showToast('❌ Copy failed. Please select text manually.', 'error');
        }
    }

    /**
     * Show animated toast message
     */
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
        }, 2800);
    }

    /**
     * Event Listeners
     */
    unicodeInput.addEventListener('input', performConversion);
    unicodeInput.addEventListener('propertychange', performConversion);

    btnCopyCorel.addEventListener('click', () => {
        copyToClipboard(currentAsciiOutput);
    });

    btnClear.addEventListener('click', () => {
        unicodeInput.value = '';
        performConversion();
        unicodeInput.focus();
        showToast('🗑️ Cleared text', 'success');
    });

    // Initial conversion
    performConversion();
});
