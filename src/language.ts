import { defined } from './condition'
import { defaultValue } from './default'
import { storage } from './storage'

export const validLanguages: string[] = []

export interface ILanguage {
  key: string
  name: string
}

export interface ILanguageCategoryDefinition {
  [key: string]: string | ((a?: any) => string)
}

export interface ILanguageDefinition {
  [key: string]: ILanguageCategoryDefinition
}

let activeLanguageKey: string
let defaultLanguageKey: string
const onChangeRegistry: Array<() => void> = []
const storedLanguage = storage<string>('ui:language')
const activeLanguage: ILanguageDefinition = {}
const definitionsByLanguage: {
  [key: string]: ILanguageDefinition | undefined
} = {}

let loaded = false

export const languages: ILanguage[] = []

export const language = {
  set(languageKey: string) {
    if (validLanguages.indexOf(languageKey) === -1) {
      throw new Error(`${languageKey} is not a valid language`)
    }
    storedLanguage.value = languageKey
    activeLanguageKey = languageKey
    language.refresh()
    onChangeRegistry.forEach(action => {
      action()
    })
  },

  load() {
    if (loaded) {
      return
    }

    loaded = true

    const candidateLanguageKey = defaultValue(storedLanguage.value, defaultLanguageKey)
    if (validLanguages.indexOf(candidateLanguageKey) === -1) {
      throw new Error(`${candidateLanguageKey} is not a valid language`)
    }
    activeLanguageKey = candidateLanguageKey
    language.refresh()
  },

  onChange(action: () => void) {
    onChangeRegistry.push(action)
  },

  get() {
    return activeLanguageKey
  },

  refresh(): void {
    const selectedLanguage = language.get()
    const primary = definitionsByLanguage[defaultLanguageKey]
    const targetLanguage = definitionsByLanguage[selectedLanguage]

    if (!defined(primary) || !defined(targetLanguage)) {
      return
    }

    Object.keys(primary)
      .forEach(category => {
        if (!(category in activeLanguage)) {
          activeLanguage[category] = {}
        }

        Object.keys(primary[category])
          .forEach(keyword => {
            activeLanguage[category][keyword] =
              (selectedLanguage !== defaultLanguageKey &&
                (category in targetLanguage) && (keyword in targetLanguage[category])) ?
                targetLanguage[category][keyword] :
                activeLanguage[category][keyword] = primary[category][keyword]
          })
      })
  },

  registerLanguage(lang: ILanguage) {
    if (defined(definitionsByLanguage[lang.key])) {
      throw new Error(`Language ${lang.key} was previously registered`)
    }

    languages.push(lang)
    definitionsByLanguage[lang.key] = {}
  },

  registerCategory(languageKey: string, category: string, definition: ILanguageCategoryDefinition) {
    if (definition.LANGUAGE !== languageKey) {
      throw new Error(`"export const LANGUAGE = '${languageKey}'" not found in language/${languageKey}/${category}.ts`)
    }

    if (!defined(definitionsByLanguage[languageKey])) {
      throw new Error(`Language ${languageKey} must first be registered with language.registerLanguage()`)
    }

    if (!defined(defaultLanguageKey)) {
      defaultLanguageKey = languageKey
      activeLanguageKey = languageKey
    }

    validLanguages.push(languageKey)

    const currentLanguage = definitionsByLanguage[languageKey]

    if (defined(currentLanguage)) {
      currentLanguage[category] = definition
    }
  },

  getActiveCategory(category: string) {
    if (!(category in activeLanguage)) {
      activeLanguage[category] = {}
    }

    return activeLanguage[category]
  }
}
