// A utility to synthesize a "page flip" sound without external assets
export const playPageFlipSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    // Create a buffer for white noise
    const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter the noise to sound more like paper (Lowpass)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    // Envelope to make it short and crisp like a page turn
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2); // Decay

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error("Audio play failed", e);
  }
};