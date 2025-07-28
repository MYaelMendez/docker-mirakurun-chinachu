/**
 * Minimal QRCode implementation for testing
 * This is a mock implementation to demonstrate the QRCodeDomManager
 */
var QRCode = function(element, options) {
    this.element = element;
    this.options = options || {};
    
    // Create a mock QR code display
    this.createMockQRCode();
};

QRCode.prototype.createMockQRCode = function() {
    const container = document.createElement('div');
    container.style.width = (this.options.width || 256) + 'px';
    container.style.height = (this.options.height || 256) + 'px';
    container.style.backgroundColor = this.options.colorLight || '#ffffff';
    container.style.border = '2px solid ' + (this.options.colorDark || '#000000');
    container.style.position = 'relative';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.flexDirection = 'column';
    container.style.fontSize = '12px';
    container.style.color = this.options.colorDark || '#000000';
    container.style.textAlign = 'center';
    container.style.padding = '10px';
    container.style.boxSizing = 'border-box';
    
    // Add mock QR pattern
    const pattern = document.createElement('div');
    pattern.innerHTML = '⬛⬜⬛⬜⬛<br>⬜⬛⬜⬛⬜<br>⬛⬜⬛⬜⬛<br>⬜⬛⬜⬛⬜<br>⬛⬜⬛⬜⬛';
    pattern.style.fontSize = (this.options.width || 256) / 20 + 'px';
    pattern.style.lineHeight = '1';
    pattern.style.marginBottom = '10px';
    
    const text = document.createElement('div');
    text.textContent = 'QR: ' + (this.options.text || 'Mock QR Code');
    text.style.fontSize = '10px';
    text.style.opacity = '0.7';
    text.style.wordWrap = 'break-word';
    text.style.maxWidth = '100%';
    
    container.appendChild(pattern);
    container.appendChild(text);
    
    // Clear element and add our mock QR code
    this.element.innerHTML = '';
    this.element.appendChild(container);
};

// Error correction levels
QRCode.CorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
};