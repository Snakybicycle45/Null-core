export function getLore(chapter) {

  const loreMap = {
    1: "Boot sequence initiated...",
    2: "Signal anomaly detected.",
    3: "Origin unknown.",
    5: "The signal is not artificial.",
    8: "It is observing us.",
    12: "Layer two unlocked.",
    15: "The Observatory was built to contain it.",
    20: "You are no longer a player."
  };

  return loreMap[chapter] || "";
}
