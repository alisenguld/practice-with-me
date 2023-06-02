import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "00f8cf76213a4230a7b4b6796e801a44 ";
const token = [
  "007eJxTYJBzWcL4Q1skoWSL0X0OFvtl94TSjypohPBM+PipU3hPzj4FBgODNIvkNHMzI0PjRBMjY4NE8ySTJDNzS7NUCwPDRBOT10sqUhoCGRnMp/awMjJAIIjPzuCal56TWZzBwAAA08keKg==",
  "007eJxTYJBzWcL4Q1skoWSL0X0OFvtl94TSjypohPBM+PipU3hPzj4FBgODNIvkNHMzI0PjRBMjY4NE8ySTJDNzS7NUCwPDRBOT10sqUhoCGRnMp/awMjJAIIjPzuCal56TWZzBwAAA08keKg==",
  "007eJxTYFDp/1Omvyr/EXfsssX57lsevH3iInoxtMXA+02HiNvlr6kKDAYGaRbJaeZmRobGiSZGxgaJ5kkmSWbmlmapFgaGiSYmZ7tLUxoCGRlOS75hZWSAQBCfncE1Lz0nsziDgQEA8kQhew==",
  "007eJxTYNgi/fjju4/LQmcrPCyd/Z1bcZrVU3XRCxNqVyQ7PFmkaLZagcHAIM0iOc3czMjQONHEyNgg0TzJJMnM3NIs1cLAMNHE5H53aUpDICPDnpe8rIwMEAjiszO45qXnZBZnMDAAACiUIcg=",
  "007eJxTYFi96/DDA2KT2Gvf1s5kNVlzYv93zxbhkzNm3pW+nPBTLMtRgcHAIM0iOc3czMjQONHEyNgg0TzJJMnM3NIs1cLAMNHE5FN3aUpDICNDihcjEyMDBIL47Ayueek5mcUZDAwAFechAg==",
  "007eJxTYFDp/1Omvyr/EXfsssX57lsevH3iInoxtMXA+02HiNvlr6kKDAYGaRbJaeZmRobGiSZGxgaJ5kkmSWbmlmapFgaGiSYmZ7tLUxoCGRlOS75hZWSAQBCfncE1Lz0nsziDgQEA8kQhew==",
  "007eJxTYNgi/fjju4/LQmcrPCyd/Z1bcZrVU3XRCxNqVyQ7PFmkaLZagcHAIM0iOc3czMjQONHEyNgg0TzJJMnM3NIs1cLAMNHE5H53aUpDICPDnpe8rIwMEAjiszO45qXnZBZnMDAAACiUIcg=",
  "007eJxTYFi96/DDA2KT2Gvf1s5kNVlzYv93zxbhkzNm3pW+nPBTLMtRgcHAIM0iOc3czMjQONHEyNgg0TzJJMnM3NIs1cLAMNHE5FN3aUpDICNDihcjEyMDBIL47Ayueek5mcUZDAwAFechAg==",
  "007eJxTYFi96/DDA2KT2Gvf1s5kNVlzYv93zxbhkzNm3pW+nPBTLMtRgcHAIM0iOc3czMjQONHEyNgg0TzJJMnM3NIs1cLAMNHE5FN3aUpDICNDihcjEyMDBIL47Ayueek5mcUZDAwAFechAg==",

  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",
  "007eJxTYPBffPEq7wqWHD/rSPFr/mes/4ZWSG0v9G/nO3qi9WSqCJsCg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhookJw4TSlIZARgbv9P3MjAwQCOKzMbgVpeYlZzAwAADnjB11",

  "007eJxTYFj7Ykaw2IPAQDFj95ePd2mkLGib/YYtViQn3OR/7m+b9jYFBgODNIvkNHMzI0PjRBMjY4NE8ySTJDNzS7NUCwPDRBOT+T2lKQ2BjAxmKudYGRkgEMRnY3BPLcpNzGNgAABjdB8m",
  "007eJxTYNgkZbb70tmNEyYHLGD6oySdG7p0t3r5qeqalr16ltJhFckKDAYGaRbJaeZmRobGiSZGxgaJ5kkmSWbmlmapFgaGiSYmG3tKUxoCGRmWN9UyMjJAIIjPxuCeWpSbmMfAAABFhB79",
  "007eJxTYPDalK2llB8bE9lUutbv16mJMZPczG9YOjh7NUtH7t1+5I4Cg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhoonJkZ7SlIZARgYX8RPMjAwQCOKzMbinFuUm5jEwAAAarh6O",
  "007eJxTYGhqFF8f4V91YVNlJ09t/vHfPQaiYXdq1r3vU/8ylc91YY0Cg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhoonJnZ7SlIZARgbhgAxWRgYIBPHZGNxTi3IT8xgYAID4H3M=",
  "007eJxTYFj7Ykaw2IPAQDFj95ePd2mkLGib/YYtViQn3OR/7m+b9jYFBgODNIvkNHMzI0PjRBMjY4NE8ySTJDNzS7NUCwPDRBOT+T2lKQ2BjAxmKudYGRkgEMRnY3BPLcpNzGNgAABjdB8m",
  "007eJxTYNgkZbb70tmNEyYHLGD6oySdG7p0t3r5qeqalr16ltJhFckKDAYGaRbJaeZmRobGiSZGxgaJ5kkmSWbmlmapFgaGiSYmG3tKUxoCGRmWN9UyMjJAIIjPxuCeWpSbmMfAAABFhB79",
  "007eJxTYPDalK2llB8bE9lUutbv16mJMZPczG9YOjh7NUtH7t1+5I4Cg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhoonJkZ7SlIZARgYX8RPMjAwQCOKzMbinFuUm5jEwAAAarh6O",
  "007eJxTYGhqFF8f4V91YVNlJ09t/vHfPQaiYXdq1r3vU/8ylc91YY0Cg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhoonJnZ7SlIZARgbhgAxWRgYIBPHZGNxTi3IT8xgYAID4H3M=",
  "007eJxTYGhqFF8f4V91YVNlJ09t/vHfPQaiYXdq1r3vU/8ylc91YY0Cg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhoonJnZ7SlIZARgbhgAxWRgYIBPHZGNxTi3IT8xgYAID4H3M=",
  "007eJxTYGhqFF8f4V91YVNlJ09t/vHfPQaiYXdq1r3vU/8ylc91YY0Cg4FBmkVymrmZkaFxoomRsUGieZJJkpm5pVmqhYFhoonJnZ7SlIZARgbhgAxWRgYIBPHZGNxTi3IT8xgYAID4H3M=",
];

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config); //Hook
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(); // Hook
export const channelName = [
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "French",
  "French",
  "French",
  "French",
  "French",
  "French",
  "French",
  "French",
  "French",
  "German",
  "German",
  "German",
  "German",
  "German",
  "German",
  "German",
  "German",
  "German",
  "German",
];
