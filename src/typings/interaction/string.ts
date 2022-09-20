import { InteractionOptionChoicesOrAutoCompleteWrapper } from ".";
import { InteractionOptionBase, InteractionOptionChoices } from "./base";
import { InteractionOptionType } from "./enums";

export interface InteractionOptionString extends InteractionOptionBase<InteractionOptionType.STRING> {
  min_length?: number;
  max_length?: number;
}

export type InteractionOptionTypeString = InteractionOptionString & InteractionOptionChoicesOrAutoCompleteWrapper<InteractionOptionString, InteractionOptionChoices<string>>;
