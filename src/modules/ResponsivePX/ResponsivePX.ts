//TODO - create this class for responsive dimensions 

import { Dimensions } from "react-native";

export default class ResponsivePX {
  height: number | null = null;
  width: number | null = null;
  constructor(height?: number, width?: number) {
    if (height !== undefined) {
      this.height = height;
    }

    if (width !== undefined) {
      this.width = width;
    }

  }

  hpx(height: number) {
    const csh = Dimensions.get('screen').height;
    // TODO - add orientatino change 
  }
}
