import { InteractionOptionChoicesOrAutoCompleteWrapper } from ".";
import { InteractionOptionBase, InteractionOptionChoices } from "./base";
import { InteractionOptionType } from "./enums";

export interface InteractionOptionNumber extends InteractionOptionBase<InteractionOptionType.NUMBER> {
  min_value?: number;
  max_value?: number;
}

export type InteractionOptionTypeNumber = InteractionOptionNumber & InteractionOptionChoicesOrAutoCompleteWrapper<InteractionOptionNumber, InteractionOptionChoices<number>>;