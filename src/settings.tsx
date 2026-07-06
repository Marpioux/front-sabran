import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Lang } from './i18n'

interface SettingsCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

const Ctx = createContext<SettingsCtx | null>(null)

function initialLang(): Lang {
  try {
    const l = localStorage.getItem('lang')
    if (l === 'fr' || l === 'en') return l
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && navigator.language.startsWith('en'))
    return 'en'
  return 'fr'
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  return (
    <Ctx.Provider value={{ lang, setLang: setLangState }}>
      {children}
    </Ctx.Provider>
  )
}

export function useSettings(): SettingsCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useSettings must be used within SettingsProvider')
  return c
}
