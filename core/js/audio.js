/**
 * Minimal audio toggle state without external assets.
 */
export function createAudioController() {
  let enabled = true;
  return {
    toggle() {
      enabled = !enabled;
      return enabled;
    },
    isEnabled() {
      return enabled;
    },
  };
}
