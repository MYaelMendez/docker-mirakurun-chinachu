# QRCodeDomManager

A JavaScript utility class for dynamically creating and managing QR code elements in the DOM.

## Features

- **Easy QR Code Creation**: Create QR codes with customizable options
- **DOM Management**: Add, remove, and clear QR codes from any container
- **Flexible Configuration**: Support for size, colors, and error correction levels
- **Statistics & Tracking**: Get information about managed QR codes
- **Update Support**: Update existing QR codes with new content
- **No Framework Dependencies**: Pure JavaScript implementation

## Requirements

- **qrcodejs library**: Load from CDN or include locally
- Modern browser with ES5+ support

## Usage

### Basic Setup

```html
<!-- Include qrcodejs library -->
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>

<!-- Include QRCodeDomManager -->
<script src="QRCodeDomManager.js"></script>

<!-- Container for QR codes -->
<div id="qr-container"></div>
```

### Initialize Manager

```javascript
// Initialize with DOM element
const qrManager = new QRCodeDomManager(document.getElementById('qr-container'));

// Or initialize with CSS selector
const qrManager = new QRCodeDomManager('#qr-container');
```

### Create QR Codes

```javascript
// Basic QR code
const qrId = qrManager.createQRCode('Hello World');

// QR code with custom options
const qrId = qrManager.createQRCode('https://github.com', {
    width: 300,
    height: 300,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
});
```

### Manage QR Codes

```javascript
// Remove specific QR code
qrManager.removeQRCode(qrId);

// Clear all QR codes
const removedCount = qrManager.clearAll();

// Update existing QR code
qrManager.updateQRCode(qrId, 'New content');

// Get QR code information
const info = qrManager.getQRCodeInfo(qrId);
console.log(info); // { id: 'qr-1', text: 'Hello World', options: {...} }

// Get all QR codes
const allQRCodes = qrManager.getAllQRCodes();

// Get count
const count = qrManager.getCount();
```

## API Reference

### Constructor

#### `new QRCodeDomManager(container)`

Creates a new QRCodeDomManager instance.

- `container` (HTMLElement|string): DOM element or CSS selector

### Methods

#### `createQRCode(text, options)`

Creates a new QR code and adds it to the container.

- `text` (string): Text/data to encode
- `options` (Object): Configuration options
  - `width` (number): Width in pixels (default: 256)
  - `height` (number): Height in pixels (default: 256)
  - `colorDark` (string): Dark squares color (default: '#000000')
  - `colorLight` (string): Light squares color (default: '#ffffff')
  - `correctLevel` (number): Error correction level (default: QRCode.CorrectLevel.M)

Returns: `string` - Unique QR code ID

#### `removeQRCode(qrId)`

Removes a specific QR code.

- `qrId` (string): QR code ID

Returns: `boolean` - Success status

#### `clearAll()`

Removes all QR codes from the container.

Returns: `number` - Number of removed QR codes

#### `updateQRCode(qrId, newText)`

Updates an existing QR code with new content.

- `qrId` (string): QR code ID
- `newText` (string): New text to encode

Returns: `boolean` - Success status

#### `getQRCodeInfo(qrId)`

Gets information about a specific QR code.

- `qrId` (string): QR code ID

Returns: `Object|null` - QR code information or null if not found

#### `getAllQRCodes()`

Gets information about all managed QR codes.

Returns: `Array` - Array of QR code information objects

#### `getCount()`

Gets the number of currently managed QR codes.

Returns: `number` - QR code count

## Error Correction Levels

The QRCode library supports four error correction levels:

- `QRCode.CorrectLevel.L` - Low (~7% correction)
- `QRCode.CorrectLevel.M` - Medium (~15% correction) 
- `QRCode.CorrectLevel.Q` - Quartile (~25% correction)
- `QRCode.CorrectLevel.H` - High (~30% correction)

## Example Use Cases

- **Contact Information**: Generate QR codes for vCards
- **URLs**: Create QR codes for website links
- **WiFi Access**: Generate WiFi connection QR codes
- **Product Information**: Link to product details
- **Event Management**: Create QR codes for event tickets
- **Marketing Campaigns**: Generate codes for promotional content

## Demo

See `demo.html` for a complete working example with a user interface that demonstrates all features of the QRCodeDomManager.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This utility is provided as-is for use with the qrcodejs library. Please refer to the qrcodejs library license for QR code generation functionality.