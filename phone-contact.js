const phoneContact = document.querySelector('#phone-contact');
const phoneActionStatus = document.querySelector('#phone-action-status');
const isPhoneOrTablet = navigator.userAgentData?.mobile === true ||
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (phoneContact && !isPhoneOrTablet) {
  phoneContact.setAttribute('aria-label', 'Copy Daniel Amaya Gamero’s phone number');
  phoneActionStatus.textContent = 'Copy number';
  phoneContact.addEventListener('click', async event => {
    // Keep the contact-card link available through the browser's link menu.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const number = phoneContact.textContent.trim();
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(number);
      phoneActionStatus.textContent = 'Phone number copied.';
    } catch {
      // Select the visible number when clipboard permission is unavailable.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(phoneContact);
      selection.removeAllRanges();
      selection.addRange(range);
      phoneActionStatus.textContent = 'Press Ctrl+C (⌘C on Mac) to copy the selected number.';
    }
  });
}
