@extends('layouts.app')
@section('content')
@include('admin.includes.menu')

<div class="container promos-creator"><br>

    <div class="card">
        <div class="card-header">
            Création d'une nouvelle promotion
        </div>

        <div class="card-body">
            <form action="{{ route('promotions.store') }}" method="POST">
                {{ csrf_field() }}
                <div class="form-group">
                    <div class="form-row">
                        <div class="col-6">
                            <label for="promotion">Promotion</label>
                            <input type="text" name="promotion" class="form-control {{ $errors->has('promotion') ? 'is-invalid' : '' }}" placeholder="Promotion" value="{{ old('promotion') }}">
                            @if ($errors->has('promotion'))
                            <div class="invalid-feedback">{{ $errors->first('promotion') }}</div>
                            @endif
                        </div>
                        <div class="col-6">
                            <label for="amount">Montant</label>
                            <input type="text" name="amount" class="form-control {{ $errors->has('amount') ? 'is-invalid' : '' }}" placeholder="Montant" value="{{ old('amount') }}">
                            @if ($errors->has('amount'))
                            <div class="invalid-feedback">{{ $errors->first('amount') }}</div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="text-center">
                        <button class="btn btn-primary btn-create-promo" type="submit">Créer la promotion</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div><br>
@endsection

<style>

    .promos-creator {
        padding: 3em 0;
    }

    .btn-create-promo {
        background-color: #850038 !important;
        border-color: #850038 !important;
    }

</style>
