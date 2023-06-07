import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "00f8cf76213a4230a7b4b6796e801a44 ";
const token = [
  "007eJxTYPgy+dCJA+69fufexTxtCwjw7/d5v6Jgk4Tk+ah/RdWLDssrMBgYpFkkp5mbGRkaJ5oYGRskmieZJJmZW5qlWhgYJpqYaOTVpzQEMjJsnpPAzMgAgSA+O4NrXnpOZnEGAwMAT3Qhzg==",
  "007eJxTYPgy+dCJA+69fufexTxtCwjw7/d5v6Jgk4Tk+ah/RdWLDssrMBgYpFkkp5mbGRkaJ5oYGRskmieZJJmZW5qlWhgYJpqYaOTVpzQEMjJsnpPAzMgAgSA+O4NrXnpOZnEGAwMAT3Qhzg==",

  "007eJxTYHh01um63+GT+s8dza58Ftzy7m8YU0b+rx09i6Zu/fyhJbxLgcHAIM0iOc3czMjQONHEyNgg0TzJJMnM3NIs1cLAMNHEZKpNZUpDICOD2q/fLIwMEAjiszO45qXnZBZnMDAAAM8SI/U=",
  "007eJxTYHh01um63+GT+s8dza58Ftzy7m8YU0b+rx09i6Zu/fyhJbxLgcHAIM0iOc3czMjQONHEyNgg0TzJJMnM3NIs1cLAMNHEZKpNZUpDICOD2q/fLIwMEAjiszO45qXnZBZnMDAAAM8SI/U=",
  "007eJxTYBDMWT3hQoKRGou9a3BtiZFZQGM1h8WjhpKo2U2cAScrPykwGBikWSSnmZsZGRonmhgZGySaJ5kkmZlbmqVaGBgmmpgo3K1IaQhkZGizEmdiZIBAEJ+dwTUvPSezOIOBAQB+6Rxt",
  "007eJxTYBDMWT3hQoKRGou9a3BtiZFZQGM1h8WjhpKo2U2cAScrPykwGBikWSSnmZsZGRonmhgZGySaJ5kkmZlbmqVaGBgmmpgo3K1IaQhkZGizEmdiZIBAEJ+dwTUvPSezOIOBAQB+6Rxt",
  "007eJxTYBDMWT3hQoKRGou9a3BtiZFZQGM1h8WjhpKo2U2cAScrPykwGBikWSSnmZsZGRonmhgZGySaJ5kkmZlbmqVaGBgmmpgo3K1IaQhkZGizEmdiZIBAEJ+dwTUvPSezOIOBAQB+6Rxt",
  "007eJxTYBDMWT3hQoKRGou9a3BtiZFZQGM1h8WjhpKo2U2cAScrPykwGBikWSSnmZsZGRonmhgZGySaJ5kkmZlbmqVaGBgmmpgo3K1IaQhkZGizEmdiZIBAEJ+dwTUvPSezOIOBAQB+6Rxt",
  "007eJxTYBDMWT3hQoKRGou9a3BtiZFZQGM1h8WjhpKo2U2cAScrPykwGBikWSSnmZsZGRonmhgZGySaJ5kkmZlbmqVaGBgmmpgo3K1IaQhkZGizEmdiZIBAEJ+dwTUvPSezOIOBAQB+6Rxt",

  "007eJxTYFj5eMY90Uv7j8yZm/+yxvXzql1XnmsGvBK+2vrTtVTp751aBQYDgzSL5DRzMyND40QTI2ODRPMkkyQzc0uzVAsDw0QTkx13K1IaAhkZFuziZWZkgEAQn43BrSg1LzmDgQEA6k4kEg==",
  "007eJxTYFj5eMY90Uv7j8yZm/+yxvXzql1XnmsGvBK+2vrTtVTp751aBQYDgzSL5DRzMyND40QTI2ODRPMkkyQzc0uzVAsDw0QTkx13K1IaAhkZFuziZWZkgEAQn43BrSg1LzmDgQEA6k4kEg==",
  "007eJxTYFj5eMY90Uv7j8yZm/+yxvXzql1XnmsGvBK+2vrTtVTp751aBQYDgzSL5DRzMyND40QTI2ODRPMkkyQzc0uzVAsDw0QTkx13K1IaAhkZFuziZWZkgEAQn43BrSg1LzmDgQEA6k4kEg==",
  "007eJxTYPDw6pwau94zpqbX8u7SRbPeGmtMiVWdd/FEgEnI08c730YpMBgYpFkkp5mbGRkaJ5oYGRskmieZJJmZW5qlWhgYJpqYqNyrSGkIZGS4me/CxMgAgSA+G4NbUWpecgYDAwCuwCBu",
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
