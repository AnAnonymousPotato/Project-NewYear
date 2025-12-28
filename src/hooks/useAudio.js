import { useRef, useCallback } from 'react';

export const useAudio = () => {
    const audioContext = useRef(null);
    const masterGain = useRef(null);

    // Initialize AudioContext on first user interaction
    const initAudio = useCallback(() => {
        if (!audioContext.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext.current = new AudioContext();
            masterGain.current = audioContext.current.createGain();
            masterGain.current.connect(audioContext.current.destination);
            masterGain.current.gain.setValueAtTime(0.8, audioContext.current.currentTime); // Master volume

            // Resume if suspended (browser policy)
            if (audioContext.current.state === 'suspended') {
                audioContext.current.resume();
            }
        }
    }, []);

    // 1. The Riser (T-10s)
    // Sawtooth wave sweeping up + LFO for "wobble"
    const playRiser = useCallback(() => {
        if (!audioContext.current) initAudio();
        const ctx = audioContext.current;
        const now = ctx.currentTime;
        const duration = 10;

        // Oscillator (Sawtooth)
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + duration);

        // Filter (Lowpass sweeping open)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(3000, now + duration);

        // LFO (Tremolo/Wobble)
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 8; // 8Hz wobble
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 500; // Depth
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency); // Modulate filter cutoff

        const gainObj = ctx.createGain();
        gainObj.gain.setValueAtTime(0, now);
        gainObj.gain.linearRampToValueAtTime(0.5, now + duration); // Fade in

        osc.connect(filter);
        filter.connect(gainObj);
        gainObj.connect(masterGain.current);

        osc.start(now);
        lfo.start(now);
        osc.stop(now + duration);
        lfo.stop(now + duration);
    }, [initAudio]);

    // 2. The Impact (T-0s)
    // Deep Sine Drop + Noise Burst
    const playImpact = useCallback(() => {
        if (!audioContext.current) initAudio();
        const ctx = audioContext.current;
        const now = ctx.currentTime;

        // Kick (Sub Bass)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5); // Drop pitch fast

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5); // Long tail

        osc.connect(gain);
        gain.connect(masterGain.current);
        osc.start(now);
        osc.stop(now + 2);

        // Noise Burst (Crash)
        const bufferSize = ctx.sampleRate * 2; // 2 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain.current);
        noise.start(now);
    }, [initAudio]);

    // 3. The Drone (Bliss)
    const playDrone = useCallback(() => {
        if (!audioContext.current) initAudio();
        const ctx = audioContext.current;
        const now = ctx.currentTime;

        // Simple Major Chord (C Major: C, E, G)
        const freqs = [261.63, 329.63, 392.00, 523.25];
        const playDuration = 15;
        const fadeOutDuration = 5;

        freqs.forEach(f => {
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.value = f;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.1, now + 5); // Slow fade in

            // Wait 15s then fade out over 5s
            gain.gain.setValueAtTime(0.1, now + playDuration);
            gain.gain.exponentialRampToValueAtTime(0.001, now + playDuration + fadeOutDuration);

            osc.connect(gain);
            gain.connect(masterGain.current);
            osc.start(now);
            osc.stop(now + playDuration + fadeOutDuration + 1);
        });
    }, [initAudio]);

    return { initAudio, playRiser, playImpact, playDrone };
};
