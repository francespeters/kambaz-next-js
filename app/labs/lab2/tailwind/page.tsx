import "./index.css";
import "./TailwindSpacing";
import Spacing from "./TailwindSpacing";
import "./TailwindTypography";
import Type from "./TailwindTypography";
import "./TailwindBackgroundColors";
import BackgroundColors from "./TailwindBackgroundColors";
import "./TailwindResponsiveDesign";
import ResponsiveDesign from "./TailwindResponsiveDesign";
import "./TailwindResponsiveDesign";
import Filters from "./TailwindFilters";
import "./TailwindGrids";
import Grids from "./TailwindGrids";

export default function TailwindLab() {
 return (
   <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Tailwind CSS</h1>
        <Spacing />
        <Type />
        <BackgroundColors />
        <ResponsiveDesign />
        <Filters />
        <Grids />
        
   </div>
 );
}
