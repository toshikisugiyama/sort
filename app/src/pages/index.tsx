import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useForm } from '@/hooks/useForm'
import { TextBoxItem } from '@/components/UiParts/TextBoxItem'
import { CheckBoxItem } from '@/components/UiParts/CheckBoxItem'
import { Checkbox } from '@/types'
import { useMemo } from 'react'
import { useAppInfo } from '@/hooks/useAppInfo'

const Home: NextPage = () => {

  const { title } = useAppInfo()

  const options1: Checkbox[] = [{
    id: 'remove-empty-line',
    label: '空行を排除',
  }, {
    id: 'no-change-line',
    label: '改行を排除',
  }]

  const options2: Checkbox[] = [{
    id: 'not-cepalate',
    label: '区切らない',
  }, {
    id: 'cepalate-with-comma',
    label: 'カンマで区切る',
  }, {
    id: 'cepalate-with-semicolon',
    label: 'セミコロンで区切る',
  },]

  const {
    val: contentValue,
    handleForm: handleContentForm,
  } = useForm()

  const {
    val: optionValue1,
    handleForm: handleOptionValue1,
  } = useForm()

  const {
    val: optionValue2,
    handleForm: handleOptionValue2,
  } = useForm(options2)

  const adjustedContent = useMemo(() => {
    if (Array.isArray(contentValue)) return ''
    let target: string = contentValue.replace(/\r?\n/g, '\n')
    const convert = (
      separator: string,
      noChangeLine?: boolean,
    ) => {
      target = target
        .replace(/\n/g, ':::\n:::')
        .split(':::')
        .reduce((acc: string[], cur) => {
          if (!cur.length) return acc
          return cur !== '\n'
            ? [...acc, `${cur}${separator}${!noChangeLine ? '\n' : ''}`]
            : [...acc, cur]
        }, [])
        .join('')
      console.log({target})
      return target
    }
    if (optionValue1.includes('remove-empty-line')) convert('\n')
    if (optionValue1.includes('no-change-line')) convert(' ')
    if (optionValue2.includes('not-cepalate')) convert(' ', optionValue1.includes('no-change-line'))
    if (optionValue2.includes('cepalate-with-comma')) convert(', ', optionValue1.includes('no-change-line'))
    if (optionValue2.includes('cepalate-with-semicolon')) convert('; ', optionValue1.includes('no-change-line'))
    return target
  }, [optionValue1, optionValue2, contentValue])

  return (
    <Layout>
      <h1 className='
        text-6xl
        font-bold
        text-center
      '>{title}</h1>
      <form>
        <div className='mt-10'>
          <CheckBoxItem
            label='Select Us!'
            type='checkbox'
            id='option1'
            onChange={handleOptionValue1}
            items={options1}
            value={Array.isArray(optionValue1) ? optionValue1 : []}
          />
        </div>
        <div className='mt-10'>
          <CheckBoxItem
            label='Select Us!'
            type='radio'
            id='option2'
            onChange={handleOptionValue2}
            items={options2}
            value={Array.isArray(optionValue2) ? optionValue2 : []}
          />
        </div>
        <div className='mt-10'>
          <TextBoxItem
            label='Contents'
            id='content'
            type='textarea'
            onChange={handleContentForm}
          />
        </div>
      </form>
      <div className='mt-10 border border-black p-5'>
        {
          !adjustedContent.length
            ? <p className='text-center'>The result will be displayed here.</p>
            : <pre>{adjustedContent}</pre>
        }
      </div>
    </Layout>
  )
}

export default Home
