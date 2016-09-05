import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Wegschicker from './Wegschicker'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<Wegschicker/>, div)
})

it('should have correct default values on startup', () => {
	const component = TestUtils.renderIntoDocument(<Wegschicker />)

	expect(component.state.candiesToEvolve).toBe(12)
	expect(component.state.numberOfCandies).toBe(0)
	expect(component.state.numberOfPokemon).toBe(0)
	expect(component.state.pokemonToEvolve).toBe(0)
	expect(component.state.pokemonToSendAway).toBe(0)
	expect(component.state.candiesLeft).toBe(0)
})

it("use case: enought pkmn and candies for exaclly one evolution", () => {
	const component = TestUtils.renderIntoDocument(<Wegschicker />)

	component.setState({
		candiesToEvolve: 12,
		numberOfPokemon: 1,
		numberOfCandies: 12
	})

	component.calculate();

	expect(component.state.pokemonToEvolve).toBe(1)
	expect(component.state.pokemonToSendAway).toBe(0)
	expect(component.state.candiesLeft).toBe(1)
})

it("use case: enough candies but not enought pkmn", () => {
	const component = TestUtils.renderIntoDocument(<Wegschicker />)

	component.setState({
		candiesToEvolve: 12,
		numberOfPokemon: 0,
		numberOfCandies: 12
	})

	component.calculate();

	expect(component.state.pokemonToEvolve).toBe(0)
	expect(component.state.pokemonToSendAway).toBe(0)
	expect(component.state.candiesLeft).toBe(12)
})


it("use case: enough pkmn but not enought candies", () => {
	const component = TestUtils.renderIntoDocument(<Wegschicker />)

	component.setState({
		candiesToEvolve: 12,
		numberOfPokemon: 1,
		numberOfCandies: 5
	})

	component.calculate();

	expect(component.state.pokemonToEvolve).toBe(0)
	expect(component.state.pokemonToSendAway).toBe(1)
	expect(component.state.candiesLeft).toBe(6)
})

it("use case: too many candies, some will be left", () => {
	const component = TestUtils.renderIntoDocument(<Wegschicker />)

	component.setState({
		candiesToEvolve: 12,
		numberOfPokemon: 5,
		numberOfCandies: 100
	})

	component.calculate();

	expect(component.state.pokemonToEvolve).toBe(5)
	expect(component.state.pokemonToSendAway).toBe(0)

	// evolve 5 pkmn takes away 12*5=60 candies and gives back 5 candies
	expect(component.state.candiesLeft).toBe(45)
})

it("use case: too many pkmn, some will be left", () => {
	const component = TestUtils.renderIntoDocument(<Wegschicker />)

	component.setState({
		candiesToEvolve: 12,
		numberOfPokemon: 30,
		numberOfCandies: 30
	})

	component.calculate();

	// step 1: evolve 2 pkmn -> takes 24 candies and gives back 2 -> 8 candies, 28 pkmn left
	// step 2: send away 4 pkmn -> 12 candies, 24 pkmn left
	// step 3: evolve 1 pkmn -> 1 candies, 23 pkmn left
	// step 4: send away 11 pkmn -> 12 candies, 12 pkmn left
	// step 5: evolve 1 pkmn -> 1 candies, 11 pkmn left
	// step 6: send away 11 pkmn -> 12 candies, 0 pkmn left

	expect(component.state.pokemonToEvolve).toBe(4)
	expect(component.state.pokemonToSendAway).toBe(26)
	expect(component.state.candiesLeft).toBe(12)
})
