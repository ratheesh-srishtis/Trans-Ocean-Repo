const brand = process.env.REACT_APP_BRAND;

const config = {
  transocean: {
    title: "Trans Ocean",
    logo: require("../assets/images/LOGO.png"),
    templateHeaderOne: require("../assets/images/transoceanheaderpart-1.jpg"),
    templateHeaderTwo: require("../assets/images/transoceanheaderpart-2.jpg"),
    templateFooter: require("../assets/images/transoceanfooter-1.jpg"),
    currencyName: "OMR",
  },
  transwave: {
    title: "Trans Wave",
    logo: require("../assets/images/transwave-logo.png"),
    templateHeaderOne: require("../assets/images/transwave-header-1.jpg"),
    templateHeaderTwo: require("../assets/images/transwave-header-2.jpg"),
    templateFooter: require("../assets/images/transwavefooter.jpg"),
    currencyName: "AED",
  },
};

// Fallback to transocean if brand is not set or invalid
const selectedConfig = config[brand] || config["transocean"];

export default selectedConfig;
