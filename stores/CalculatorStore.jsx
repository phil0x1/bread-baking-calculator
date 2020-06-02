import { observable, onBecomeObserved } from "mobx";
import { action, computed, runInAction } from "mobx";

class CalculatorStore {
  @observable flours = [["Bread Flour", 100]];
  @observable ingredients = [["Salt", 3]];

  @observable waterPerc = 85;
  @observable totalWeight = 800;
  @observable starterPerc = 10;
  @observable starterFlourIndex = 0;

  computeWeight = (ingredientPerc) => {
    return Math.round(
      ingredientPerc *
        (this.totalWeight /
          (this.ingredients.map((x) => x[1]).reduce((x, y) => x + y) +
            this.flours.map((x) => x[1]).reduce((x, y) => x + y) +
            this.waterPerc))
    );
  };

  @computed get starterFlour() {
    return this.flours[this.starterFlourIndex];
  }

  @computed get starterWeight() {
    return Math.round(this.totalWeight * (this.starterPerc / 100.0));
  }

  @action recomputeFlours() {
    const total = this.flours.map((x) => x[1]).reduce((x, y) => x + y, 0);
    if (total > 100) {
      this.flours[0][1] -= total - 100;
    } else if (total < 100) {
      this.flours[0][1] += 100 - total;
    }
  }
  @action addFlour() {
    this.flours = [...this.flours, ["Whole Wheat Flour", 0]];
    this.recomputeFlours();
  }

  @action removeFlour(index) {
    this.flours = this.flours.filter((value, i) => i != index);
    this.recomputeFlours();
  }

  @action addIngredient() {
    this.ingredients = [
      ...this.ingredients,
      ["Ingredient " + this.ingredients.length, 0],
    ];
  }

  @action removeIngredient(index) {
    this.ingredients = this.ingredients.filter((value, i) => i != index);
  }
}

export const calculatorStore = new CalculatorStore();
export default calculatorStore;