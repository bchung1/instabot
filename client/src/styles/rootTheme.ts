
const grayScale = {
    gray0: "#f9f9f",
    gray1: "#eceeef",
    gray2: "#dee1e3",
    gray3: "#cfd3d7",
    gray4: "#bfc5c9",
    gray5: "#adb4b9",
    gray6: "#98a1a8",
    gray7: "#7f8b93",
    gray8: "#606e79",
    gray9: "#374047"
}

const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
}

const rootTheme = {
    primaryColor: "#92DCE5",
    primaryFont: "'Open Sans', sans-serif",
    contentMaxWidth: "1100px",
    ...grayScale,
    breakpoints: {
        ...breakpoints
    }
}

export default rootTheme;