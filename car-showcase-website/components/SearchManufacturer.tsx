import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { manufacturers } from "@constants";
import { SearchManuFacturerProps } from "@types";

// create a functional component 'SearchManufacturer' which takes in 'manufacturer' and 'setManuFacturer' property of 'SearchManufacturer' type as props
const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
  const [query, setQuery] = useState(""); // create state variable'query' and its setter function'setQuery' using 'useState' hook

  /* if query is empty, return all manufacturers, otherwise for each item in 'manufacturers' array, convert 'query' to lowercase and remove all spaces
  and check if 'query' after trimming is in 'item' ie current array element */
  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        <div className='relative w-full'>
          {/* Combobox.Button contains icon which we click to see complete dropdown */}
          <Combobox.Button className='absolute top-[14px]'>
            <Image src='/car-logo.svg' width={20} height={20} className='ml-4' alt='car logo' />
          </Combobox.Button>

          {/* input field which initially contains 'item' and changing it calls 'setQuery' function for new value */}
          <Combobox.Input className='search-manufacturer__input' displayValue={(item: string) => item} onChange={(event) => setQuery(event.target.value)} placeholder='Volkswagen...' />

          {/* Transition which is fragment ie all elements in it are not contained in a DOM node
          transition comes slowly in 100 milliseconds, leave from opacity 100 to 0 and calls 'setQuery' for empty string upon completion */}
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' afterLeave={() => setQuery("")}>
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm' static>
              {filteredManufacturers.length === 0 && query !== "" ? ( // if length of 'filteredManufacturers' array is 0 and 'query' is not empty
                // then create a <Combobox.Option> element with text "Create '{query}'"
                <Combobox.Option value={query} className='search-manufacturer__option'>
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => ( // otherwise for each item in 'filteredManufacturers' array, create it's own 'Combobox.Option' element
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{item}</span>

                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;