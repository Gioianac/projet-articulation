@extends('layouts.app')
@section('content')
@include('admin.includes.menu')

<div class="container types-creator"><br>

    <div class="card">
        <div class="card-header">
            Création d'un nouveau type
        </div>

        <div class="card-body">
            <form action="{{ route('types.store') }}" method="POST">
                {{ csrf_field() }}
                <div class="form-group">
                    <div class="form-row">
                        <div class="col-12">
                            <label for="type">Type</label>
                            <input type="text" name="type" class="form-control {{ $errors->has('type') ? 'is-invalid' : '' }}" placeholder="Type" value="{{ old('type') }}">
                            @if ($errors->has('type'))
                            <div class="invalid-feedback">{{ $errors->first('type') }}</div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="text-center">
                        <button class="btn btn-primary btn-create-type" type="submit">Créer le type</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div><br>
@endsection

<style>

    .types-creator {
        padding: 3em 0;
    }

    .btn-create-type {
        background-color: #850038 !important;
        border-color: #850038 !important;
    }

</style>
