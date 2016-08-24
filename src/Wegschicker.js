import React, { Component } from 'react';


class Wegschicker extends Component {

	constructor(props) {
		super(props)
		this.state = {
			candiesToEvolve: 12,
			numberOfCandies: 0,
			numberOfPokemon: 0,
			pokemonToSendAway: 0,
			pokemonToEvolve: 0,
			candiesLeft: 0
		}
	}

	onValueChanged = (e) => {
		const id = e.target.id
		const value = e.target.value

		if(["numberOfPokemon", "numberOfCandies", "candiesToEvolve"].includes(id)) {
			this.setState({
				[id]: Number(value)
			}, this.calculate)
		}
	}

	calculate = () => {
		const numberOfCandies = this.state.numberOfCandies;
		const numberOfPokemon = this.state.numberOfPokemon;
		const candiesToEvolve = this.state.candiesToEvolve;

		if(!(numberOfPokemon && candiesToEvolve)) {
			this.setState({
				pokemonToSendAway: 0,
				pokemonToEvolve: 0,
				candiesLeft: numberOfCandies
			})
			return
		}


		const pokemonToSendAway = Math.max(0, Math.ceil(numberOfPokemon + (1 - numberOfPokemon - numberOfCandies) / candiesToEvolve));
		const pokemonToEvolve = numberOfPokemon - pokemonToSendAway
		const candiesLeft = numberOfCandies - (pokemonToEvolve * candiesToEvolve) + pokemonToSendAway + pokemonToEvolve

		this.setState({
			pokemonToSendAway,
			pokemonToEvolve,
			candiesLeft
		})
	}



	render() {
		return (
				<div className="panel panel-default">
					<div className="panel-body">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-4 control-label">Benötigte Bonbons je Entwicklung</label>
								<div className="col-sm-8">
									<select
										id="candiesToEvolve"
										name="candiesToEvolve"
										className="form-control"
										value={this.state.candiesToEvolve}
										onChange={this.onValueChanged}
									>
										<option value="12">12</option>
										<option value="25">25</option>
										<option value="50">50</option>
										<option value="100">100</option>
										<option value="400">400</option>
									</select>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-4 control-label">Anzahl an Bonbons</label>
								<div className="col-sm-8">
									<input
										id="numberOfCandies"
										type="number"
										className="form-control"
										min="0"
										max="10000"
										step="1"
										value={this.state.numberOfCandies}
										onChange={this.onValueChanged}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-4 control-label">Anzahl an Pokemon</label>
								<div className="col-sm-8">
									<input
										id="numberOfPokemon"
										type="number"
										className="form-control"
										min="0"
										max="10000"
										step="1"
										value={this.state.numberOfPokemon}
										onChange={this.onValueChanged}
									/>
								</div>
							</div>
							<hr/>
							<div className="form-group">
								<label className="col-sm-4 control-label">Pokemon wegschicken</label>
								<div className="col-sm-8">
									<p className="form-control-static">{this.state.pokemonToSendAway}</p>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-4 control-label">Pokemon zum Entwickeln</label>
								<div className="col-sm-8">
									<p className="form-control-static">{this.state.pokemonToEvolve}</p>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-4 control-label">Bonbons nachher übrig</label>
								<div className="col-sm-8">
									<p className="form-control-static">{this.state.candiesLeft}</p>
								</div>
							</div>
						</form>

					</div>
				</div>
		)
	}
}

export default Wegschicker
