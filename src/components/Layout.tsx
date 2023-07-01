import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return <div className="mt-10 flex flex-col justify-center">{children}</div>
}
