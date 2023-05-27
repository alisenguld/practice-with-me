import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "00f8cf76213a4230a7b4b6796e801a44 ";
const token = [
  "007eJxTYKjT2uBplyGlY6D9sD0rK/LZ/rUJF64diX7E1/tB+/T282IKDAYGaRbJaeZmRobGiSZGxgaJ5kkmSWbmlmapFgaGiSYmjd15KQ2BjAzef+UYGRkgEMRnZ3DNS8/JLM5gYAAAjhsgGQ==",
  "007eJxTYDCatsizw+njx769FewFs3jevPxncfyWhmVlFfPMF8rxhosUGAwM0iyS08zNjAyNE02MjA0SzZNMkszMLc1SLQwME01MblQXpDQEMjKc3PyJgREKQXx2Bte89JzM4gwGBgDjHCGO",
];

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config); //Hook
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(); // Hook
export const channelName = ["English", "English"];
