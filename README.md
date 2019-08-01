# README

#membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

#userテーブル

｜Column|Type|Options|
|------|----|-------|
|name|string|null: false,|
|email|text|null: falsee|
|password|string|null: false|
|string|null: false|

### Association
- has_many :tweets


#tweetsテーブル

|Column|Type|Options|
|------|----|-------|
|image|text|null: false|
|text|text|null: false|

### Association
- has_many :user

#groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :members :though :
- has_many :user