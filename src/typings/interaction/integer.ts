import { InteractionOptionChoicesOrAutoCompleteWrapper } from ".";
import { InteractionOptionBase, InteractionOptionChoices } from "./base";
import { InteractionOptionType } from "./enums";

export interface InteractionOptionInteger extends InteractionOptionBase<InteractionOptionType.INTEGER> {
  min_value?: number;
  max_value?: number;
}

export type InteractionOptionTypeInteger = InteractionOptionInteger & InteractionOptionChoicesOrAutoCompleteWrapper<InteractionOptionInteger, InteractionOptionChoices<number>>;