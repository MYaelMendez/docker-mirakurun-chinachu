/**
 * QRCodeDomManager - A utility class for managing QR code elements in the DOM
 * 
 * This class provides methods to create, manage, and remove QR code elements
 * within any DOM container, leveraging the qrcodejs library.
 * 
 * @requires qrcodejs library (loaded via CDN or included separately)
 */
class QRCodeDomManager {
  /**
   * Creates a new QRCodeDomManager instance
   * @param {HTMLElement|string} container - The DOM element or selector for the container where QR codes will be managed
   */
  constructor(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    } else if (container instanceof HTMLElement) {
      this.container = container;
    } else {
      throw new Error('Container must be a DOM element or a valid CSS selector');
    }

    if (!this.container) {
      throw new Error('Container element not found');
    }

    // Store QR code instances for management
    this.qrCodes = new Map();
    this.qrCodeCounter = 0;
  }

  /**
   * Creates a new QR code and adds it to the container
   * @param {string} text - The text/data to encode in the QR code
   * @param {Object} options - Configuration options for the QR code
   * @param {number} [options.width=256] - Width of the QR code
   * @param {number} [options.height=256] - Height of the QR code
   * @param {string} [options.colorDark='#000000'] - Color of dark squares
   * @param {string} [options.colorLight='#ffffff'] - Color of light squares
   * @param {string} [options.correctLevel=QRCode.CorrectLevel.M] - Error correction level
   * @returns {string} - Unique ID of the created QR code
   */
  createQRCode(text, options = {}) {
    if (typeof QRCode === 'undefined') {
      throw new Error('QRCode library is not loaded. Please include qrcodejs library.');
    }

    if (!text || typeof text !== 'string') {
      throw new Error('Text parameter must be a non-empty string');
    }

    // Generate unique ID for this QR code
    const qrId = `qr-${++this.qrCodeCounter}`;
    
    // Create wrapper div for the QR code
    const qrWrapper = document.createElement('div');
    qrWrapper.className = 'qr-code-wrapper';
    qrWrapper.id = qrId;
    qrWrapper.style.margin = '10px';
    qrWrapper.style.display = 'inline-block';
    qrWrapper.style.textAlign = 'center';

    // Create QR code container
    const qrContainer = document.createElement('div');
    qrContainer.className = 'qr-code-container';
    
    // Create text label
    const textLabel = document.createElement('div');
    textLabel.className = 'qr-code-text';
    textLabel.textContent = text;
    textLabel.style.marginTop = '8px';
    textLabel.style.fontSize = '12px';
    textLabel.style.wordBreak = 'break-all';
    textLabel.style.maxWidth = (options.width || 256) + 'px';

    // Set default options
    const qrOptions = {
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
      ...options
    };

    try {
      // Create QR code instance
      const qrCode = new QRCode(qrContainer, {
        text: text,
        ...qrOptions
      });

      // Assemble the wrapper
      qrWrapper.appendChild(qrContainer);
      qrWrapper.appendChild(textLabel);
      
      // Add to container
      this.container.appendChild(qrWrapper);

      // Store reference
      this.qrCodes.set(qrId, {
        element: qrWrapper,
        qrInstance: qrCode,
        text: text,
        options: qrOptions
      });

      return qrId;
    } catch (error) {
      // Clean up on error
      if (qrWrapper.parentNode) {
        qrWrapper.parentNode.removeChild(qrWrapper);
      }
      throw new Error(`Failed to create QR code: ${error.message}`);
    }
  }

  /**
   * Removes a specific QR code by its ID
   * @param {string} qrId - The unique ID of the QR code to remove
   * @returns {boolean} - True if QR code was found and removed, false otherwise
   */
  removeQRCode(qrId) {
    const qrData = this.qrCodes.get(qrId);
    if (!qrData) {
      return false;
    }

    // Remove from DOM
    if (qrData.element && qrData.element.parentNode) {
      qrData.element.parentNode.removeChild(qrData.element);
    }

    // Clear from map
    this.qrCodes.delete(qrId);
    return true;
  }

  /**
   * Removes all QR codes from the container
   * @returns {number} - Number of QR codes that were removed
   */
  clearAll() {
    const count = this.qrCodes.size;
    
    // Remove all elements from DOM
    this.qrCodes.forEach((qrData) => {
      if (qrData.element && qrData.element.parentNode) {
        qrData.element.parentNode.removeChild(qrData.element);
      }
    });

    // Clear the map
    this.qrCodes.clear();
    
    return count;
  }

  /**
   * Gets information about a specific QR code
   * @param {string} qrId - The unique ID of the QR code
   * @returns {Object|null} - QR code information or null if not found
   */
  getQRCodeInfo(qrId) {
    const qrData = this.qrCodes.get(qrId);
    if (!qrData) {
      return null;
    }

    return {
      id: qrId,
      text: qrData.text,
      options: qrData.options
    };
  }

  /**
   * Gets information about all QR codes
   * @returns {Array} - Array of QR code information objects
   */
  getAllQRCodes() {
    const result = [];
    this.qrCodes.forEach((qrData, qrId) => {
      result.push({
        id: qrId,
        text: qrData.text,
        options: qrData.options
      });
    });
    return result;
  }

  /**
   * Gets the number of QR codes currently managed
   * @returns {number} - Number of QR codes
   */
  getCount() {
    return this.qrCodes.size;
  }

  /**
   * Updates the text of an existing QR code
   * @param {string} qrId - The unique ID of the QR code to update
   * @param {string} newText - The new text to encode
   * @returns {boolean} - True if QR code was found and updated, false otherwise
   */
  updateQRCode(qrId, newText) {
    const qrData = this.qrCodes.get(qrId);
    if (!qrData) {
      return false;
    }

    if (!newText || typeof newText !== 'string') {
      throw new Error('New text must be a non-empty string');
    }

    try {
      // Clear the existing QR code
      const container = qrData.element.querySelector('.qr-code-container');
      container.innerHTML = '';

      // Create new QR code with same options
      const newQRCode = new QRCode(container, {
        text: newText,
        ...qrData.options
      });

      // Update text label
      const textLabel = qrData.element.querySelector('.qr-code-text');
      if (textLabel) {
        textLabel.textContent = newText;
      }

      // Update stored data
      qrData.qrInstance = newQRCode;
      qrData.text = newText;

      return true;
    } catch (error) {
      throw new Error(`Failed to update QR code: ${error.message}`);
    }
  }
}