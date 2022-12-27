import React from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import useDarkMode from '../hooks/useDarkMode'
import classNames from 'classnames'

const DarkModeSwitch = () => {
  const [enabled, setEnabled] = useDarkMode()

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className={classNames('rounded-full', enabled ? 'animate-dark' : 'animate-light')}
        >
          {enabled ? (
            <MoonIcon
              className="ease block h-6 w-6 text-blue-100 transition duration-100 hover:text-blue-200/75 md:h-7 md:w-7"
              aria-hidden="true"
            />
          ) : (
            <SunIcon
              className="ease block h-6 w-6 text-orange-300 transition duration-100 hover:text-orange-400/80 md:h-7 md:w-7"
              aria-hidden="true"
            />
          )}
        </Switch>
      </div>
    </Switch.Group>
  )
}

export default DarkModeSwitch
