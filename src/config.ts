import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "GinRaku",
  subtitle: "By",
  lang: "zh_CN",
  themeColor: {
    hue: 250,
    fixed: false,
  },
  banner: {
    enable: false,
    src: "assets/images/demo-banner.png",
    position: "center",
    credit: {
      enable: false,
      text: "",
      url: "",
    },
  },
  toc: {
    enable: true,
    depth: 2,
  },
  favicon: [],
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    // LinkPreset.About,
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/demo-avatar.png",
  name: "Mango",
  bio: "",
  links: [],
};

export const licenseConfig: LicenseConfig = {
  enable: false,
  name: "",
  url: "",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  theme: "github-dark",
};
