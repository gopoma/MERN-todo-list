import { type FC } from 'react'

interface Props {
  children: JSX.Element[] | JSX.Element
}

export const Layout: FC<Props> = ({ children }) => {
  return <>
    <section className='p-4'>
      <main className='max-w-[800px] m-auto p-4 bg-slate-100 flex flex-col gap-4'>
        { children }
      </main>
    </section>
  </>
}
