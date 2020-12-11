import * as React from "react";

import {
  InputAdornment,
  Input,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import { observer } from "mobx-react";

import { calculatorStore } from "../../stores/CalculatorStore";
import { Ingredients } from "./Ingredients";
import { Flours } from "./Flours";
import { SCalculator } from "./SCalculator";
import { handleChangeNumber, stripHTML } from "./Utils";

const Calculator = observer(() => {
  React.useEffect(() => calculatorStore.loadHash(), []);

  const waterWeight = () =>
    Math.round(
      calculatorStore.computeWeight(calculatorStore.waterPerc) -
        calculatorStore.starterWeight / 2
    );

  return (
    <div className="container" style={{ padding: "1rem" }}>
      <SCalculator>
        <h1>Bread Baking Calculator</h1>
        <div className="columns is-multiline is-mobile">
          <div className="column is-half">Final Dough Weight</div>
          <div className="column is-half">
            <Input
              type="number"
              style={{ width: "100%" }}
              value={calculatorStore.totalWeight}
              onChange={(e) => handleChangeNumber(e, "totalWeight")}
              label="Total weight"
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </div>
        </div>
        <Flours />

        <div className="columns is-multiline is-mobile">
          <div className="column is-half">Water</div>
          <div className="column is-half">
            <Input
              type="number"
              max="100"
              style={{ width: "100%" }}
              value={calculatorStore.waterPerc}
              onChange={(e) => handleChangeNumber(e, "waterPerc")}
              label="Percentage"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />

            <div className="weight">{waterWeight()} grams</div>
          </div>
        </div>

        <Ingredients />

        <div className="columns is-multiline is-mobile">
          <div className="column is-half">
            Starter in percentage of total weight (100% hydration starter)
          </div>
          <div className="column is-half">
            <Input
              type="number"
              max="100"
              style={{ width: "100%" }}
              value={calculatorStore.starterPerc}
              onChange={(e) => handleChangeNumber(e, "starterPerc")}
              label="Percentage"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <div className="weight">{calculatorStore.starterWeight} grams</div>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="age-native-simple">
                Which Flour did you use?
              </InputLabel>
              <Select
                native
                value={calculatorStore.starterFlourIndex}
                onChange={(e: React.ChangeEvent<any>) => {
                  calculatorStore.starterFlourIndex = parseInt(e.target.value);
                  calculatorStore.recomputeHash();
                }}
              >
                {calculatorStore.flours.map(
                  (flour: [string, number], index: number) => (
                    <option key={`flour_${index}`} value={index}>
                      {stripHTML(flour[0])}
                    </option>
                  )
                )}
              </Select>
            </FormControl>
          </div>
        </div>
      </SCalculator>
    </div>
  );
});

export default Calculator;